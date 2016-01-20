class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery
  # before_action :authenticate_user!
  # Prevent CSRF attacks by raising an exception.
  before_filter :authenticate_user_from_token!, :if => Proc.new { |c| c.request.format == 'application/json' }

  private

  # For this example, we are simply using token authentication
  # via parameters. However, anyone could use Rails's token
  # authentication features to get the token from a header.
  def authenticate_user_from_token!

    user_token = params[:auth_token].presence
    user       = user_token && User.find_by_authentication_token(user_token.to_s)

    if user
      # Notice we are passing store false, so the user is not
      # actually stored in the session and a token is needed
      # for every request. If you want the token to work as a
      # sign in token, you can simply remove store: false.
      # user = User.where(authentication_token: params[:auth_token].to_s)
      sign_in user
    end

  end


end
