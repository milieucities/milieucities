class PublicMeetingNotification < CompleteApplicationNotification

  GLOBAL_MERGE_VARS = [:date_sent, :file_numbers, :application_types, :application_address, :dev_site_url, :meeting_date, :meeting_location, :meeting_time]

  def initialize(notification)
    super
    @global_merge_vars = GLOBAL_MERGE_VARS
    @meeting = @status.meeting
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
