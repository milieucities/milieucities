class DevSite < ActiveRecord::Base
  attr_accessor :images, :files

  scope :latest, -> { joins(:statuses).order('statuses.status_date DESC') }

  VALID_APPLICATION_TYPES = [ "Site Plan Control", "Official Plan Amendment", "Zoning By-law Amendment",
    "Demolition Control", "Cash-in-lieu of Parking", "Plan of Subdivision",
    "Plan of Condominium", "Derelict", "Vacant" ,"Master Plan"]

  VALID_BUILDING_TYPES = ["Not Applicable", "Derelict", "Demolition", "Residential Apartment",
    "Low-rise Residential", "Mid-rise Residential", "Hi-rise Residential", "Mixed-use Residential/Community",
    "Commercial", "Commercial/Hotel","Mixed-use", "Additions"]

  has_many :comments, as: :commentable, dependent: :destroy
  has_many :addresses, as: :addressable, dependent: :destroy
  has_many :statuses, dependent: :destroy
  has_many :city_files, dependent: :destroy
  has_many :likes, dependent: :destroy

  accepts_nested_attributes_for :addresses, allow_destroy: true
  accepts_nested_attributes_for :statuses, allow_destroy: true
  accepts_nested_attributes_for :likes, allow_destroy: true

  validates :devID, uniqueness: { message: "Dev Id must be unique" }
  validates :application_type, presence: { message: "Application type is required" }
  validates :description, presence: { message: "Description is required" }
  validates :ward_name, presence: { message: "Ward name is required" }
  validates :ward_num, presence: { message: "Ward number is required" }, numericality: true

  def self.search(search_params)
    dev_site_ids = []
    dev_sites = DevSite.all

    if search_params[:latitude].present? && search_params[:longitude].present?
      dev_site_ids
        .push(Address.within(5, :origin => [search_params[:latitude], search_params[:longitude]])
        .closest(origin: [search_params[:latitude], search_params[:longitude]])
        .limit(150)
        .pluck(:addressable_id))
      dev_sites = DevSite.find_ordered(dev_site_ids.flatten.uniq)
    end

    if search_params[:year].present?
      dev_sites = dev_sites
        .where('extract(year from updated) = ?', search_params[:year])
    end

    if search_params[:ward].present?
      dev_sites = dev_sites
        .where(ward_name: search_params[:ward])
    end

    if search_params[:status].present?
      dev_sites = dev_sites
        .where('statuses.status_date = (SELECT MAX(statuses.status_date) FROM statuses WHERE statuses.dev_site_id = dev_sites.id)')
        .where(statuses: { status: search_params[:status] })
    end

    dev_sites
  end

  def status
    return if self.statuses.empty?
    self.statuses.order('status_date DESC').first.status
  end

  def status_date
    return if self.statuses.empty?
    self.statuses.order('status_date DESC').first.status_date ? self.statuses.order('status_date DESC').first.status_date.strftime("%B %e, %Y") : nil
  end

  def address
    return if self.addresses.empty?
    self.addresses.first.street
  end

  def latitude
    return if self.addresses.empty?
    self.addresses.first.lat
  end

  def longitude
    return if self.addresses.empty?
    self.addresses.first.lon
  end

  def image_hash
    return if self.images.empty?
    self.images.map do |img|
      dimensions = FastImage.size(img.url)
      { src: img.url, w: dimensions.first, h: dimensions.last }
    end
  end

  def image_url
    if self.images.present?
      self.images.first.web.url
    else
      return "https://maps.googleapis.com/maps/api/streetview?size=600x600&location=" + self.addresses.first.street + "&key=AIzaSyAwocEz4rtf47zDkpOvmYTM0gmFT9USPAw" unless self.addresses.empty?
      ActionController::Base.helpers.image_path("mainbg.jpg");
    end
  end

  def self.find_ordered(ids)
    return where(id: ids) if ids.empty?
    order_clause = "CASE dev_sites.id "
    ids.each_with_index do |id, index|
      order_clause << "WHEN #{id} THEN #{index} "
    end
    order_clause << "ELSE #{ids.length} END"
    where(id: ids).order(order_clause)
  end

  mount_uploader :images, ImagesUploader
  mount_uploader :files, FilesUploader

  after_create do
    Resque.enqueue(NewDevelopmentNotificationJob, id)
  end

end
