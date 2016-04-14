class Project < ActiveRecord::Base
  attr_accessor :images, :files

  # Associations
  has_many :comments, as: :commentable, dependent: :destroy

  # Voting
  acts_as_votable

  # CarrierWave - Images
  mount_uploaders :images, ImagesUploader

  # CarrierWave - Files
  mount_uploaders :files, FilesUploader
end
