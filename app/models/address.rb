class Address < ActiveRecord::Base
  include Geokit::Geocoders
  belongs_to :addressable, polymorphic: true

  acts_as_mappable default_units: :kms,
                   distance_field_name: :distance,
                   lat_column_name: :lat,
                   lng_column_name: :lon
  validates :street, presence: { message: "Street is required" }
  after_validation :geocoded, if: -> (address) { address.street.present? and address.street_changed? }

  def geocoded
    lat_and_lng = Geokit::Geocoders::GoogleGeocoder.geocode(full_address)
    if lat_and_lng.success
      lat = lat_and_lng.lat
      lon = lat_and_lng.lng
    end
  end

  def full_address
    [street, city, province_state, country].delete_if { |e| e.blank? }.join(', ')
  end

end
