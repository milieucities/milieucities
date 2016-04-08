class Api::V1::RegistrationsController < Api::ApiController

  def index
    render :json => User.all
  end

  def show
    render json: @user
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render status: 200, :json => {
        status: 200,
        message: "Successfully created a user",
        user: @user
      }
    else
      render status: 422, :json => [{
        status: 422,
        message: "Could not create a user, try again!",
        errors: @user.errors.full_messages
      }]
    end
  end

  def update
    if @user.update(user_params)
      render status: 200, :json => {
        status: 200,
        message: "Successfully updated user",
        user: @user
      }
    else
      render status: 422, :json => [{
        status: 422,
        message: "Could not update user, try again!",
        errors: @user.errors.full_messages
      }]
    end
  end

  def destroy
    if @user.destroy
      render status: 200, :json => {
        status: 200,
        message: "Successfully removed the user"
      }
    else
      render status: 422, :json => [{
        status: 422,
        message: "Could not remove the user, try again!",
        errors: @user.errors.full_messages
      }]
    end
  end

  private

    def user_params
      params.require(:user).permit(:first_name,:last_name,:username,:email,
        :password, :password_confirmation, :bio, :role
      )
    end

    def find_user
      @user = User.find(params[:id])
    end



end
