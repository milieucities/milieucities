module Notifications
  class StatusAndPublicMeetingNotification < PublicMeetingNotification
    GLOBAL_MERGE_VARS = DEFAULT_MERGE_VARS + STATUS_MERGE_VARS + MEETING_MERGE_VARS

    def initialize(notification)
      super
      @global_merge_vars = GLOBAL_MERGE_VARS
    end
  end
end
