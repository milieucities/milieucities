module Notifications
  class PublicMeetingNotification < StatusNotification
    MEETING_MERGE_VARS = [
      :meeting_date,
      :meeting_location,
      :meeting_time
    ]
    GLOBAL_MERGE_VARS = DEFAULT_MERGE_VARS + MEETING_MERGE_VARS

    def initialize(notification)
      super
      @meeting = @status.meeting
      @global_merge_vars = GLOBAL_MERGE_VARS
    end

    def meeting_date
      format_date(@meeting.date)
    end

    def meeting_location
      @meeting.location
    end

    def meeting_time
      @meeting.time
    end
  end
end
