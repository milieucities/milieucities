class DevSite < ActiveRecord::Base
  attr_accessible :image, :remote_image_url

  # establish_connection DB_OTTAWA
  # ASSOCIATIONS
  has_many :comments, as: :commentable
  has_many :addresses, dependent: :destroy
  has_many :statuses, dependent: :destroy

  accepts_nested_attributes_for :addresses, :statuses
  # Rating
  ratyrate_rateable "location", "app_type"

  # CarrierWave - Images
  mount_uploader :image, ImageUploader


end
