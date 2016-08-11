class OmniauthController < ApplicationController

  def create
  	@user = User.find_by(uid: request.env['omniauth.auth']['uid'])

  	if @user.present?
  		session[:user_id] = @user.id 
  	else
  		@user = User.create(
  			uid: request.env['omniauth.auth']['uid'],
  			provider: request.env['omniauth.auth']['provider']
  		)
  		@user.build_profile(name: request.env['omniauth.auth']['info']['name'])
  		@user.save
  		session[:user_id] = @user.id 
  	
  	end 
     redirect_to root_path
  end
 end