class MandrillNotificationFactory
  class NotificationFactoryError < StandardError; end

  def generate(notification)
    command = notification_factory[notification.notification_type]
    result = command ? command.call(notification) : Notifications::GenericNotificiation.call(notification)

    return result.result if result.success?

    raise NotificationFactoryError, "Unable to generate notification: #{result.errors[:notification]}"
  end

  def notification_factory
    {
      Notification::COMPLETE_APPLICATION => Notifications::StatusNotification,
      Notification::PUBLIC_MEETING => Notifications::PublicMeetingNotification,
      Notification::COMPLETE_APPLICATION_AND_PUBLIC_MEETING => Notifications::StatusAndPublicMeetingNotification,
      Notification::REVISED_APPLICATION => Notifications::StatusNotification,
      Notification::REVISED_APPLICATION_AND_PUBLIC_MEETING => Notifications::StatusAndPublicMeetingNotification,
      Notification::DECISION_MEETING => Notifications::DecisionMeetingNotification,
      Notification::COMMENTS_CLOSED => Notifications::GenericNotification,
      Notification::PASSING => Notifications::GenericNotification,
      Notification::REJECTED => Notifications::GenericNotification,
    }
  end
end
