class CompleteApplicationNotification < GenericNotification
  GLOBAL_MERGE_VARS = [:file_numbers, :date_sent, :application_types, :application_address, :dev_site_url, :date_active]

  def initialize(notification)
    super
    @global_merge_vars = GLOBAL_MERGE_VARS
  end
end