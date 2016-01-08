class Address < ActiveRecord::Base
  belongs to :dev_site, foreign_key: "dev_site_id", dependent: :destroy
end
