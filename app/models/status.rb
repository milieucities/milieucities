class Status < ActiveRecord::Base
  scope :current, -> { order(status_date: :desc).first }
  belongs_to :dev_site, foreign_key: 'dev_site_id'

  VALID_STATUS_TYPES = [
    'Unknown',
    'Application File Pending',
    'Application Reactivated',
    'Application Approved',
    'Application Approved by Committee',
    'Application Recommended to Council',
    'Draft Report sent to Councillor and Applicant for Response',
    'In Appeal Period',
    'Comment Period in Progress',
    'Community Information and Comment Session Held',
    'Comment Period has Ended/Issue Resolution',
    'Community Information and Comment Session Open'
  ].freeze

  validates :status, presence: { message: 'Status is required' }
  validates :status_date, presence: { message: 'Status date is required' }

  def friendly_status_date
    status_date.strftime('%B %e, %Y') if status_date.present?
  end
end
