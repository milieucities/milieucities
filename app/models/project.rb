class Project < ActiveRecord::Base
  attr_accessor :images, :files

  # Voting
  acts_as_votable

  # CarrierWave - Images
  mount_uploaders :images, ImagesUploader

  # CarrierWave - Files
  mount_uploaders :files, FilesUploader
end
