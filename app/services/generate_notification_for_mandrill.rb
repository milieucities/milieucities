module Services
  class GenerateNotificationForMandrill

    def self.call(notification)
      command = notification_factory(notification.notification_type)
      result = command.call(notification)
      Rails.logger.info result.result
      result.result
    end

    def notification_factory(notification_type)
      {
        Notification::COMPLETE_APPLICATION => Services::Notifications::CompleteApplicationNotification,
        Notification::PUBLIC_MEETING => Services::Notifications::PublicMeetingNotification,
        Notification::COMPLETE_APPLICATION_AND_PUBLIC_MEETING => Services::Notifications::CompleteApplicationAndPublicMeetingNotification
      }
    end
  end
end