class ApplicationFile < ActiveRecord::Base
  VALID_APPLICATION_TYPES = [
    'Site Plan Approval',
    'Condo Approval',
    'Subdivision Approval',
    'Zoning Amendment',
    'Registered Condominium',
    'Site Plan Control',
    'Official Plan Amendment',
    'Zoning By-law Amendment',
    'Demolition Control',
    'Cash-in-lieu of Parking',
    'Plan of Subdivision',
    'Plan of Condominium',
    'Derelict',
    'Vacant',
    'Master Plan'
  ].freeze

  SITE_PLAN_APPLICATION_TYPES = [
    'Site Plan Approval',
    'Site Plan Control'
  ]

  belongs_to :dev_site
  validates :file_number, presence: true, uniqueness: true
  validates :application_type, presence: true, inclusion: { in: VALID_APPLICATION_TYPES }

  def site_plan_type?
    SITE_PLAN_APPLICATION_TYPES.include? application_type
  end
end
