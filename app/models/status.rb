class Status < ActiveRecord::Base
  belongs_to :dev_site, foreign_key: "dev_site_id", dependent: :destroy

  VALID_STATUS_TYPES = [ "Active", "Vacant", "Derelict", "Open Comment Period", "Public Consultation"]

end
