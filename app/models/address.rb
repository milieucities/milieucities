class Address < ActiveRecord::Base
  include Geokit::Geocoders
  belongs_to :addressable, polymorphic: true

  acts_as_mappable default_units: :kms,
                   distance_field_name: :distance,
                   lat_column_name: :lat,
                   lng_column_name: :lon
  validates :street, presence: { message: 'Street is required' }
  after_validation :geocoded, if: :new_street?

  def new_street?
    street.present? && street_changed?
  end

  def geocoded
    lat_and_lng = Geokit::Geocoders::GoogleGeocoder.geocode(full_address)
    return unless lat_and_lng.success
    self.lat = lat_and_lng.lat
    self.lon = lat_and_lng.lng
  end

  def full_address
    [street, city, province_state, country].delete_if(&:blank?).join(', ')
  end
end
