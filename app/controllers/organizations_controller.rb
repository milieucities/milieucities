class OrganizationsController < ApplicationController
  load_and_authorize_resource :user

  def index
    respond_to do |format|
      format.html
      format.json { render json: @user.organizations.to_json }
    end
  end

  def create
    org_name = organization_params[:name]
    org = @user.organizations.create(name: org_name)

    if org.save && @user.save
      render json: org, status: :created
    else
      render json: org.errors, status: :unprocessable_entity
    end
  end

  def organization_params
    params.require(:organization).permit(:name, user: [:email])
  end
end
