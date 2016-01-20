Rails.application.config.middleware.use OmniAuth::Builder do
  # provider :facebook, ENV['FACEBOOK_KEY'], ENV['FACEBOOK_SECRET']
  provider :facebook, "953425448060864", "fea49b23ef78cc5669ed7937914b5d4e"
end
