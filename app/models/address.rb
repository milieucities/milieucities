class Address < ActiveRecord::Base
  include Geokit::Geocoders

  belongs_to :addressable, polymorphic: true

  acts_as_mappable default_units: :kms,
                   distance_field_name: :distance,
                   lat_column_name: :lat,
                   lng_column_name: :lon

  validates :street, presence: { message: "Street is required" }

  after_validation :geocoded, if: -> (obj) { obj.street.present? and obj.street_changed? }

  def geocoded
    lat_and_lng = Geokit::Geocoders::GoogleGeocoder.geocode self.street
    if lat_and_lng.success
      self.lat = lat_and_lng.lat
      self.lon = lat_and_lng.lng
    end
  end

end
