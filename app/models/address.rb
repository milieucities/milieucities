class Address < ActiveRecord::Base
  belongs_to :dev_site, foreign_key: "dev_site_id", dependent: :destroy

  # GEOCODER
  geocoded_by :address
  after_validation :geocode
end
