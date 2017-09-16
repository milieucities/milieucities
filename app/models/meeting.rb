class Meeting < ActiveRecord::Base
  PUBLIC_MEETING_TYPE = 'public'.freeze
  COUNCIL_MEETING_TYPE = 'council'.freeze

  VALID_MEETING_TYPES = [
    COUNCIL_MEETING_TYPE,
    PUBLIC_MEETING_TYPE
  ].freeze

  belongs_to :dev_site
  belongs_to :status
end
