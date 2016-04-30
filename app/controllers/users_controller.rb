class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    begin
      @user.save
      login(@user)
      redirect_to root_path, notice: "Welcome to CitizenCity"
    rescue Exception => e
      puts e.backtrace.inspect
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

  def show
    @user = User.find(params[:id])
  end


  private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :username, :email, :password, :password_confirmation,
        :bio, :role, :neighbourhood, :address, :organization)
    end
end
