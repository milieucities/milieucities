class OmniauthController < ApplicationController

  def create
    @user = User.find_by(uid: request.env['omniauth.auth']['uid'])

    unless @user.present?
      @user = User.create(uid: request.env['omniauth.auth']['uid'],
                          provider: request.env['omniauth.auth']['provider'])
      @user.build_profile(name: request.env['omniauth.auth']['info']['name'])
      @user.save
    end
    session[:user_id]= @user.id
    redirect_to root_path, notice: "Welcome to Milieu"
  end
end
