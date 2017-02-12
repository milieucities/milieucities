object @organization

attributes :id, :name

child :municipalities do
  attributes :id, :name
end

child :users => :members do
  attributes :id, :email

  node :membership_id do |user|
    @organization.memberships.find_by(user_id: user.id).id
  end

  node :admin do |user|
    user.admin?
  end
end
