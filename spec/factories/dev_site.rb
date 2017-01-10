FactoryGirl.define do
  factory :dev_site do
    devID { FFaker::Identification.drivers_license }
    application_type 'Site Plan Control'
    description 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    ward_name { FFaker::Name }
    ward_num 13
  end
end
