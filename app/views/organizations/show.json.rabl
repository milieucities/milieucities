object @organization

  attributes :id, :name

child :users do
  attributes :id, :email

  node :admin do |user|
    user.admin?
  end
end
