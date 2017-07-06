FactoryGirl.define do
  factory :notification do
    notification_type Notification::COMPLETE_APPLICATION
    send_at DateTime.current
  end
end
