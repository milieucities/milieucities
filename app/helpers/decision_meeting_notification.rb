class DecisionMeetingNotification < PublicMeetingNotification
  GLOBAL_MERGE_VARS = [:date_sent, :file_numbers, :application_types, :application_address, :dev_site_url, :public_meeting_date, :meeting_date, :meeting_location, :meeting_time]

  def initialize(notification)
    super
    @global_merge_vars = GLOBAL_MERGE_VARS
    @meeting = @status.meeting
  end

  def public_meeting_date
    all_meetings = @dev_site.statuses.map(&:meeting)
    public_meeting = all_meetings.select { |m| m.meeting_type == Meeting::PUBLIC_MEETING_TYPE }
    return unless public_meeting.any?

    format_date(public_meeting.last.date)
  end
end
