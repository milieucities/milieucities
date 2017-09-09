FactoryGirl.define do
  factory :status do
    start_date { DateTime.current }
    status Status::APPLICATION_COMPLETE_STATUS
    created { DateTime.current }
  end
end
