# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :contact do
    first_name { FFaker::Name::first_name }
    last_name { FFaker::Name::last_name }
    contact_type Contact::PLANNER
    email_address { FFaker::Internet.email }
  end
end
