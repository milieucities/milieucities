class DevSite < ActiveRecord::Base
  attr_accessor :images, :files

  default_scope { order(updated_at: :desc ) }

  VALID_APPLICATION_TYPES = [ "Beginning", "In Progress", "Complete"]

  # establish_connection DB_OTTAWA
  # ASSOCIATIONS
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :addresses, dependent: :destroy
  has_many :statuses, dependent: :destroy

  accepts_nested_attributes_for :addresses
  accepts_nested_attributes_for :statuses

  # Rating
  ratyrate_rateable "location", "app_type"

  def status
    self.statuses.last.status
  end

  def status_date
    self.statuses.last.status_date ? self.statuses.last.status_date.strftime("%B %e, %Y") : nil
  end

  def address
    self.addresses.first.street
  end

  # def latitude
  #   self.addresses.first.geocode_lat
  # end

  # def longitude
  #   self.addresses.first.geocode_lon
  # end

  def image
    return ActionController::Base.helpers.asset_path("mainbg.jpg") if self.images.empty?
    self.images.last.url
  end

  # CarrierWave - Images
  mount_uploaders :images, ImagesUploader

  # CarrierWave - Files
  mount_uploaders :files, FilesUploader



end

