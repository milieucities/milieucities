class GenerateNotificationForMandrill

  def generate(notification)
    command = notification_factory[notification.notification_type]
    result = command.call(notification)
    Rails.logger.info result.result
    result.result
  end

  def notification_factory
    {
      Notification::COMPLETE_APPLICATION => CompleteApplicationNotification,
      Notification::PUBLIC_MEETING => PublicMeetingNotification,
      Notification::COMPLETE_APPLICATION_AND_PUBLIC_MEETING => CompleteApplicationAndPublicMeetingNotification
    }
  end
end
