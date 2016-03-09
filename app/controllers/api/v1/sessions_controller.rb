class Api::V1::SessionsController < Api::ApiController
  before_action :session_expiry, except: [:login_authentication]
  before_action :update_activity_time
  before_action :current_user
  include BCrypt

  def login_authentication

    email = params[:user][:email]
    password = params[:user][:password]

    user = User.find_by_email(email)

    if user && user.authenticate(password)
      session[:user_id] = user.id
      render :json => [{
          "status": 200,
          "message": "Successfully Logged In."
      }]
    else
      render :json => [{
        status: 500,
        message: "Could not login, try again!",
        errors: user.errors.full_messages
      }]
    end
  end

  def login
    if signed_in?
      render :json => [{
          "user": @user
      }]
    end
  end

  def signed_in
    return redirect_to root_path unless signed_in?
  end

  def logout
    disconnect_user
    redirect_to root_path
  end

  def disconnect_user
    session[:user_id] = nil
  end

  def session_expiry
    get_session_time_left
    disconnect_user if @session_time_left <= 0
  end

  def update_activity_time
    session[:expires_at] = 24.hours.from_now
  end

  def admin_only
    if current_user.student?
      return redirect_to projects_path,
        flash: { alert: "Admin accounts only, restricted area!" }
    end
  end

private

  def get_session_time_left
    expire_time = session[:expires_at] || Time.now
    @session_time_left = (expire_time.to_time - Time.now).to_i
  end

  def current_user
    @user = User.find(session[:user_id]) if signed_in?
    @user ||= User.new
  end

  def signed_in?
    session[:user_id].present?
  end

end
