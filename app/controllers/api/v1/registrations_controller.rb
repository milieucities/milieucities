class Api::V1::RegistrationsController < Devise::RegistrationsController
  skip_before_filter :verify_authenticity_token,
                     :if => Proc.new { |c| c.request.format == 'application/json' }

  respond_to :json

  def create
    user_params = {
                    "email": params[:email],
                    "password": params[:password],
                    "password_confirmation": params[:password_confirmation]
                  }
    user = User.create(user_params)
    puts user.email
    if user.save
      sign_in user
      render :status => 200,
           :json => { :success => true,
                      :info => "Registered",
                      :data => { :user => resource,
                                 :auth_token => current_user.authentication_token } }
    else
      render :status => :unprocessable_entity,
             :json => { :success => false,
                        :info => resource.errors,
                        :data => {} }
    end
  end
end
