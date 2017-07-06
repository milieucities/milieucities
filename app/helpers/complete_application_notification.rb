class CompleteApplicationNotification < GenericNotification
  GLOBAL_MERGE_VARS = [:file_number, :date_sent, :application_type, :application_address, :link_to_full_notice, :date_active]

  def date_active
    active_status = @dev_site.statuses.find_by(status: Status::APPLICATION_COMPLETE_STATUS)
    return unless active_status

    active_status.start_date
  end
end