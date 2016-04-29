class Event < ActiveRecord::Base
  attr_accessor :images
  mount_uploaders :images, ImagesUploader

  validates :title, presence: { message: "Title is required" }
  validates :location, presence: { message: "Location is required" }
  validates :images, presence: { message: "An image is required" }
  validates :time, presence: { message: "Time is required" }
  validates :description, presence: { message: "Description is required" }
  validates :date, presence: { message: "Date is required" }

  # GEOCODER
  geocoded_by :location, :latitude => :geocode_lat, :longitude => :geocode_lon
  after_validation :geocode, if: -> (obj){ obj.location.present? and obj.location_changed? }


  def image_hash
    self.images.map do |img|
      dimensions = FastImage.size(img.url)
      { src: img.url, w: dimensions.first, h: dimensions.last }
    end
  end
  
end
