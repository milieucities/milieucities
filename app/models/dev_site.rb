class DevSite < ActiveRecord::Base
  attr_accessor :images, :files

  default_scope { order(updated_at: :desc ) }

  VALID_APPLICATION_TYPES = [ "Beginning", "In Progress", "Complete"]

  # establish_connection DB_OTTAWA
  # ASSOCIATIONS
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :addresses, dependent: :destroy
  has_many :statuses, dependent: :destroy
  has_many :city_files, dependent: :destroy

  accepts_nested_attributes_for :addresses
  accepts_nested_attributes_for :statuses

  # Rating
  ratyrate_rateable "location", "app_type"

  ## Validations
  validates     :title, presence: { message: "Title is required" }
  validates     :images, presence: { message: "At least one image is required" }
  validates     :application_type, presence: { message: "Application type is required" }
  validates     :description, presence: { message: "Description is required" }
  validates     :ward_name, presence: { message: "Ward name is required" }
  validates     :ward_num, presence: { message: "Ward number is required" }, numericality: true

  def status
    return if self.statuses.empty?
    self.statuses.last.status
  end

  def status_date
    return if self.statuses.empty?
    self.statuses.last.status_date ? self.statuses.last.status_date.strftime("%B %e, %Y") : nil
  end

  def address
    return if self.addresses.empty?
    self.addresses.first.street
  end

  def latitude
    return if self.addresses.empty?
    self.addresses.first.geocode_lat
  end

  def longitude
    return if self.addresses.empty?
    self.addresses.first.geocode_lon
  end

  def image
    return ActionController::Base.helpers.asset_path("mainbg.jpg") if self.images.empty?
    self.images.last.url
  end

  # CarrierWave - Images
  mount_uploaders :images, ImagesUploader

  # CarrierWave - Files
  mount_uploaders :files, FilesUploader



end

