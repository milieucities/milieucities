class ApplicationType < ActiveRecord::Base
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

  has_and_belongs_to_many :dev_sites
end
