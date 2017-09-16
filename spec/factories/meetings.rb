# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :meeting do
    meeting_type { Meeting::PUBLIC_MEETING_TYPE }
    date { DateTime.current }
    time '3:00 PM'
    location 'City Hall'

    trait :council do
      meeting_type { Meeting::COUNCIL_MEETING_TYPE }
    end
  end
end
