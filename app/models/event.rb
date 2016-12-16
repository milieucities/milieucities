class Event < ActiveRecord::Base
  include Geokit::Geocoders
  attr_accessor :images
  mount_uploader :images, ImagesUploader

  has_many :comments, as: :commentable, dependent: :destroy

  validates :title, presence: { message: "Title is required" }
  validates :location, presence: { message: "Location is required" }
  validates :images, presence: { message: "An image is required" }
  validates :time, presence: { message: "Time is required" }
  validates :description, presence: { message: "Description is required" }
  validates :date, presence: { message: "Date is required" }

  after_validation :geocoded, if: -> (obj){ obj.location.present? and obj.location_changed? }

  def geocoded
    lat_and_lng = Geokit::Geocoders::GoogleGeocoder.geocode self.location
    if lat_and_lng.success
      self.geocode_lat = lat_and_lng.lat
      self.geocode_lon = lat_and_lng.lng
    end
  end

  def image_hash
    self.images.map do |img|
      dimensions = FastImage.size(img.url)
      { src: img.url, w: dimensions.first, h: dimensions.last }
    end
  end

  def image_url
    if self.images.present?
      self.images.first.web.url
    else
      ActionController::Base.helpers.image_path("mainbg.jpg");
    end
  end

  def longitude
    self.geocode_lon
  end

  def latitude
    self.geocode_lat
  end

end
