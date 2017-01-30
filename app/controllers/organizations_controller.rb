class OrganizationsController < ApplicationController
  load_and_authorize_resource :user
  load_and_authorize_resource through: :user

  def index
    respond_to do |format|
      format.html
      format.json { render json: @user.organizations.to_json }
    end
  end

  def show
    respond_to do |format|
      format.json { render json: { members: @organization.users } }
    end
  end

  def create
    @user.memberships.last.admin = true

    if @user.save
      render json: @organization, status: :created
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
  end

  def update
    member_email = organization_params[:user][:email]
    member = User.find_by(email: member_email)

    if !member
      message = 'There is no user with this email address'
      render json: { message: message, status: :unprocessable_entity }
    else
      @organization.users << member

      if @organization.save
        render json: { status: :ok }
      else
        render json: { message: @organization.errors, status: :unprocessable_entity }
      end
    end
  end

  def organization_params
    params.require(:organization).permit(:name, user: [:email])
  end
end
