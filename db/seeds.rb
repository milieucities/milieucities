require 'ffaker'

def create_new_user(name, email, password)
  new_user = User.create(email: email, password: password, password_confirmation: password)
  new_user.build_profile(name: name)
  new_user.save!
end

10.times do
  name = FFaker::Name.name
  email = FFaker::Internet.email
  password = 'password'
  create_new_user(name, email, password)
end
