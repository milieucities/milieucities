class Meeting < ActiveRecord::Base
  VALID_MEETING_TYPES = [
    'council',
    'public'
  ].freeze

  belongs_to :dev_site
  belongs_to :status
end
