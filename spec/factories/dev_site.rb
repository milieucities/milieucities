FactoryGirl.define do
  factory :dev_site do
    devID { FFaker::Identification.drivers_license }
    application_type 'Site Plan Control'
    description { FFaker::DizzleIpsum.sentence }
    ward_name { FFaker::Name.name }
    ward_num 13
    municipality_id 1
    ward_id 1
  end
end
