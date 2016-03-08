class Api::V1::RegistrationsController < Api::ApiController

  def create
    @user = User.new(user_params)
    # @user.pword = params[:user][:password] if @user.valid?

    if @user.save
      render :json => {
        status: 200,
        message: "Successfully created a user"
      }
    else
      render :json => {
        status: 500,
        message: "Could not create a user, try again!"
      }
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      render :json => {
        status: 200,
        message: "Successfully removed the user"
      }
    else
      render :json => {
        status: 500,
        message: "Could not remove the user, try again!"
      }
    end
  end

  private

    def user_params
      params.require(:user).permit(:first_name,:last_name,:username,:email,
        :password, :password_confirmation, :bio, :role
      )
    end



end
