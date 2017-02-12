class OrganizationsController < ApplicationController
  load_and_authorize_resource :organization

  def index
    @no_header = true
    respond_to do |format|
      format.html
      format.json
    end
  end

  def show
    respond_to do |format|
      format.json
    end
  end

  def update
    if @organization.update(name: organization_params[:name])
      render json: @organization, status: :ok
    else
      error_message = @organization.errors.full_messages.join(', ')
      render json: { message: error_message }, status: :unprocessable_entity
    end
  end

  def create
    if @organization.save
      render json: @organization, status: :created
    else
      error_message = @organization.errors.full_messages.join(', ')
      render json: { message: error_message }, status: :unprocessable_entity
    end
  end

  def destroy
    @organization.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  def organization_params
    params.require(:organization).permit(:name)
  end
end
