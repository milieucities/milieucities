object @user

  attributes :id, :provider, :email, :organization, :community_role, :verification_status

child :profile do
  attributes :id, :name, :bio, :avatar, :anonymous_comments

  node :avatar do |profile|
    profile.avatar.web.preview.url if profile.avatar.present?
  end
end

child :address do
  attributes :id, :street, :city
end

child :comments do
  attributes :id, :body, :last_posted
end
