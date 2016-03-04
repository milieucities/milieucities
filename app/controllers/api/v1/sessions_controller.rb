class Api::V1::SessionsController < Api::ApiController

  def show
  end

  def destroy
  end

  def create
    if params[:username]
      @user = User.find_by_username(params[:username])
      token.user = @user if _provided_valid_password? || _provided_valid_api_key?
    end

    respond_with token
  end

  private

  def _provided_valid_password?
    params[:password] == 'foo password'
  end

  def _provided_valid_api_key?
    params[:api_key] == 'foo key'
  end

end
