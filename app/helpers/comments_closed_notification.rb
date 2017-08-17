class CommentsClosedNotification < GenericNotification
  GLOBAL_MERGE_VARS = [:date_sent, :file_numbers, :application_address, :dev_site_url]

  def initialize(notification)
    super
    @global_merge_vars = GLOBAL_MERGE_VARS
  end
end
