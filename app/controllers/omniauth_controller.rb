class OmniauthController < ApplicationController
  def create
    @user = User.find_by(uid: request.env['omniauth.auth']['uid'])

    create_user unless @user.present?
    update_user_email if @user.email.nil?

    session[:user_id] = @user.id
    redirect_to root_path, notice: t('sessions.notice.welcome')
  end

  private

  def create_user
    @user = User.create(uid: request.env['omniauth.auth']['uid'],
                        email: request.env['omniauth.auth']['info']['email'],
                        provider: request.env['omniauth.auth']['provider'])
    @user.build_profile(name: request.env['omniauth.auth']['info']['name'])
    @user.save
  end

  def update_user_email
    @user.update(email: request.env['omniauth.auth']['info']['email'])
  end
end
