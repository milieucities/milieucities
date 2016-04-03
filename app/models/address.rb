class Address < ActiveRecord::Base
  belongs_to :dev_site, foreign_key: "dev_site_id", dependent: :destroy
  belongs_to :event, foreign_key: "event_id", dependent: :destroy

  # GEOCODER
  geocoded_by :street,
    :latitude => :geocode_lat, :longitude => :geocode_lon
  after_validation :geocode

  # Validations
  validates     :street, presence: { message: "Street is required" }

end
