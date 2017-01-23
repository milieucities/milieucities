FactoryGirl.define do
  factory :comment do
    sentiment
    body { FFaker::DizzleIpsum.sentence }
    vote_count 0
  end
end
