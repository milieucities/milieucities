class RevisedApplicationAndPublicMeetingNotification < PublicMeetingNotification
  GLOBAL_MERGE_VARS = [:date_sent, :file_numbers, :application_types, :application_address, :dev_site_url, :meeting_date, :meeting_location, :meeting_time, :date_active]

  def initialize(notification)
    super
    @global_merge_vars = GLOBAL_MERGE_VARS
    @meeting = @status.meeting
  end
end
