class UsersController < CommentsController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to root_path, notice: "Successfully signed up"
    else
      render 'new'
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      flash[:notice] = "Successfully deleted the user"
    else
      flash[:notice] = "Could not delete the user, try again!"
    end
  end

  def index
    @users = User.all
  end


  private

    def user_params
      params.require(:user).permit(:first_name,:last_name,:username,:email,
        :password, :password_confirmation, :bio, :role)
    end
end
