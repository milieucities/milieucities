class Api::V1::RegistrationsController < Api::ApiController

  def index
    render :json => User.all
  end

  def show
    user = User.find(params[:id])
    render json: user
  end

  def create
    user = User.new(user_params)

    if user.save
      render :json => {
        status: 200,
        message: "Successfully created a user",
        user: user
      }
    else
      render :json => [{
        status: user.errors.status,
        message: "Could not create a user, try again!",
        errors: user.errors.full_messages
      }]
    end
  end

  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render :json => {
        status: 200,
        message: "Successfully updated user",
        user: user
      }
    else
      render :json => [{
        status: user.errors.status,
        message: "Could not update user, try again!",
        errors: user.errors.full_messages
      }]
    end
  end

  def destroy
    user = User.find(params[:id])
    if user.destroy
      render :json => {
        status: 200,
        message: "Successfully removed the user"
      }
    else
      render :json => [{
        status: user.errors.status,
        message: "Could not remove the user, try again!",
        errors: user.errors.full_messages
      }]
    end
  end

  private

    def user_params
      params.require(:user).permit(:first_name,:last_name,:username,:email,
        :password, :password_confirmation, :bio, :role
      )
    end



end
