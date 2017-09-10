FactoryGirl.define do
  factory :notification_setting do
    newsletter true
    immediate_vicinity_scope true
    ward_scope false
    municipality_scope false
    project_comments false
    comment_replies false
    secondary_address false
  end
end