# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :conversation do
    address "MyString"
    city "MyString"
    postal_code "MyString"
    topic "MyString"
    body "MyString"
    type ""
    image "MyString"
  end
end
