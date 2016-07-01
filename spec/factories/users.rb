FactoryGirl.define do
  factory :user do
    email { FFaker::Internet.email }
    password "12345678"
    password_confirmation "12345678"
    first_name { FFaker::Name::FIRST_NAMES }
    last_name { FFaker::Name::LAST_NAMES }
  end
end
