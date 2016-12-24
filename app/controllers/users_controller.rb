class UsersController < ApplicationController
  load_and_authorize_resource

  def index
    @users = User.all
    respond_to do |format|
      format.html
      format.json { render json: @users.to_json }
    end
  end

  def new
    @user.build_profile
  end

  def show
    @no_header = true
  end

  def edit
    @no_header = true
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path, notice: t('sessions.notice.welcome')
    else
      flash[:alert] = t('users.alert.mustAcceptTerms') unless @user.profile.accepted_terms
      render :new
    end
  end

  def update
    if @user.update(user_params)
      render :show, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    session.delete(:user_id)
    render json: {}, status: :ok
  end

  def request_verification
    VerificationMailer.request_role_verification(@user).deliver_now
    if @user.update(verification_status: 'pendingVerification')
      render json: @user, status: :ok
    else
      messages = @user.errors.full_messages.join(', ')
      render json: messages, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :email,
      :password,
      :password_confirmation,
      :organization,
      :community_role,
      :verification_status,
      address_attributes: [
        :id,
        :street,
        :city
      ],
      profile_attributes: [
        :id,
        :name,
        :bio,
        :anonymous_comments,
        :neighbourhood,
        :postal_code,
        :accepted_terms
      ]
    )
  end
end
