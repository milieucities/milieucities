class Event < ActiveRecord::Base
  attr_accessor :images
  mount_uploaders :images, ImagesUploader
end
