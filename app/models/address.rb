class Address < ActiveRecord::Base
  belongs_to :dev_site, foreign_key: "dev_site_id"
  belongs_to :event, foreign_key: "event_id"

  acts_as_mappable default_units: :kms,
                   lat_column_name: :lat,
                   distance_field_name: :distance,
                   lng_column_name: :lon

  # GEOCODER
  # geocoded_by :street, :latitude => :geocode_lat, :longitude => :geocode_lon
  # after_validation :geocode, if: -> (obj){ obj.street.present? && !obj.new_record? }

  # Validations
  validates     :street, presence: { message: "Street is required" }

end
