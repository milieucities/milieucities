FactoryGirl.define do
  factory :dev_site do
    devID { FFaker::Identification.drivers_license }
    application_type 'Site Plan Control'
    description { FFaker::DizzleIpsum.sentence }
    title { FFaker::AddressCA.street_address }
    municipality_id 1
    ward_id 1
    ward
    municipality

    after :create do |dev_site|
      create_list :address, 1, addressable_id: dev_site.id, addressable_type: 'DevSite'
      create_list :application_file, 1, dev_site: dev_site
    end
  end
end
