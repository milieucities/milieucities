class Status < ActiveRecord::Base
  belongs_to :dev_site, foreign_key: "dev_site_id", dependent: :destroy

  VALID_STATUS_TYPES = [ "Active", "Vacant", "Derelict", "Open Comment Period", "Public Consultation"]

  # Validations
  validates     :status, presence: { message: "Status is required" }
  validates     :status_date, presence: { message: "Status date is required" }

end
