# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :noumea_participant do
    age 1
    noumeaCitizen false
    email "MyString"
    area "MyString"
    howLong "MyString"
  end
end
