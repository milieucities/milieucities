class RevisedApplicationNotification < GenericNotification
  GLOBAL_MERGE_VARS = [:date_sent, :file_numbers, :application_types, :application_address, :dev_site_url, :meeting_date, :meeting_location, :meeting_time]

  def initialize(notification)
    super
    @global_merge_vars = GLOBAL_MERGE_VARS
  end
end
