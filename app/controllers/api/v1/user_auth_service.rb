module UserAuthenticationService
  module_function

  def authenticate_with_password(user, attempt)
    user && BCrypt::Password.new(user.password) == attempt
  end

  def authenticate_with_api_key(user, key, current_token)
    user && key && current_token && OpenSSL::Digest::SHA256.new("#{user.username}:#{user.api_secret}:#{current_token}") == key
  end
  
end
