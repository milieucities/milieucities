class Contact < ActiveRecord::Base
  WARD_COUNCILLOR = 'ward_councillor'.freeze
  PLANNER = 'planner'.freeze
  APPLICANT = 'applicant'.freeze

  VALID_CONTACT_TYPES = [WARD_COUNCILLOR, PLANNER, APPLICANT].freeze

  validates :contact_type, inclusion: { in: VALID_CONTACT_TYPES,
                                        message: "Please provide a valid contact type." }
end
