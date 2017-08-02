class Contact < ActiveRecord::Base
  WARD_COUNCILLOR = 'Ward Councillor'.freeze
  PLANNER = 'Planner'.freeze
  APPLICANT = 'Applicant'.freeze

  VALID_CONTACT_TYPES = %w(WARD_COUNCILLOR PLANNER APPLICANT).freeze

  validates :contact_type, inclusion: { in: VALID_CONTACT_TYPES,
                                        message: "#{value} is not a valid contact type." }
end
