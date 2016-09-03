class Conversation < ActiveRecord::Base
  belongs_to :user

  validates  :address, presence: { message: "Address is required" }
  validates  :topic, presence: { message: "Topic is required" }

  mount_uploaders :images, ImagesUploader
end
