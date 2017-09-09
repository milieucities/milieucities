FactoryGirl.define do
  factory :application_file do
    application_type { 'Site Plan Approval' }
    file_number { FFaker::Lorem.characters(5) }
  end
end
