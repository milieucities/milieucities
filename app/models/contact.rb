class Contact < ActiveRecord::Base
  WARD_COUNCILLOR = 'Ward Councillor'.freeze
  PLANNER = 'Planner'.freeze
  APPLICANT = 'Applicant'.freeze

  VALID_CONTACT_TYPES = [WARD_COUNCILLOR, PLANNER, APPLICANT].freeze

  validates :contact_type, inclusion: { in: VALID_CONTACT_TYPES,
                                        message: "Please provide a valid contact type." }
end
