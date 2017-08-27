object @notification_setting

attributes :id, :newsletter, :immediate_vicinity_scope, :ward_scope, :municipality_scope, :project_comments, :comment_replies, :secondary_address

if @notification_setting.secondary_address && @user.secondary_address
  node :address do
    { street: @user.secondary_address.street, city: @user.secondary_address.city }
  end
end
