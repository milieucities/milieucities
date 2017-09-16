module Notifications
  class StatusNotification < GenericNotification
    STATUS_MERGE_VARS = [:date_active]
    GLOBAL_MERGE_VARS = DEFAULT_MERGE_VARS + STATUS_MERGE_VARS

    def initialize(notification)
      super
      @global_merge_vars = GLOBAL_MERGE_VARS
    end

    def date_active
      active_status = @dev_site.statuses.find_by(status: Status::APPLICATION_COMPLETE_STATUS)
      return unless active_status

      format_date(active_status.start_date)
    end
  end
end