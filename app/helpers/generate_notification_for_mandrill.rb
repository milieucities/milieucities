class GenerateNotificationForMandrill

  def generate(notification)
    command = notification_factory[notification.notification_type]
    result = command.call(notification)
    result.result
  end

  def notification_factory
    {
      Notification::COMPLETE_APPLICATION => CompleteApplicationNotification,
      Notification::PUBLIC_MEETING => PublicMeetingNotification,
      Notification::COMPLETE_APPLICATION_AND_PUBLIC_MEETING => CompleteApplicationAndPublicMeetingNotification,
      Notification::REVISED_APPLICATION => RevisedApplicationNotification,
      Notification::REVISED_APPLICATION_AND_PUBLIC_MEETING => RevisedApplicationAndPublicMeetingNotification,
      Notification::DECISION_MEETING => DecisionMeetingNotification,
      Notification::COMMENTS_CLOSED => CommentsClosedNotification,
      Notification::PASSING => PassingNotification,
      Notification::REJECTED => RejectedNotification,
    }
  end
end
