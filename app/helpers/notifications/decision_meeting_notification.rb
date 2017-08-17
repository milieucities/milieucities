class DecisionMeetingNotification < PublicMeetingNotification
  DECISION_MEETING_MERGE_VARS = [:public_meeting_date]
  GLOBAL_MERGE_VARS = DEFAULT_MERGE_VARS + MEETING_MERGE_VARS + DECISION_MEETING_MERGE_VARS

  def initialize(notification)
    super
    @global_merge_vars = GLOBAL_MERGE_VARS
  end

  def public_meeting_date
    all_meetings = @dev_site.statuses.map(&:meeting)
    public_meeting = all_meetings.select { |m| m.meeting_type == Meeting::PUBLIC_MEETING_TYPE }
    return unless public_meeting.any?

    format_date(public_meeting.last.date)
  end
end
