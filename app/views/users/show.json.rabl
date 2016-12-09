object @user

  attributes :id, :provider, :email

child :profile do
  attributes :id, :name, :street, :bio, :avatar, :city, :age_range, :field_of_occupation, :receive_newletter, :postal_code

  node :avatar do |profile|
    profile.avatar.web.preview.url if profile.avatar.present?
  end
end

child :comments do
  attributes :id, :body
end
