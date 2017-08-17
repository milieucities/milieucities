class GenerateNotificationForMandrill

  def generate(notification)
    command = notification_factory[notification.notification_type]
    result = command ? command.call(notification) : Notifications::GenericNotificiation.call(notification)
    result.result
  end

  def notification_factory
    {
      Notification::COMPLETE_APPLICATION => Notifications::StatusNotification,
      Notification::PUBLIC_MEETING => Notifications::PublicMeetingNotification,
      Notification::COMPLETE_APPLICATION_AND_PUBLIC_MEETING => Notifications::StatusAndPublicMeetingNotification,
      Notification::REVISED_APPLICATION => Notifications::StatusNotification,
      Notification::REVISED_APPLICATION_AND_PUBLIC_MEETING => Notifications::StatusAndPublicMeetingNotification,
      Notification::DECISION_MEETING => Notifications::DecisionMeetingNotification,
      Notification::COMMENTS_CLOSED => Notifications::GenericNotificiation,
      Notification::PASSING => Notifications::GenericNotificiation,
      Notification::REJECTED => Notifications::GenericNotificiation,
    }
  end
end
