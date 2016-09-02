class ProfilesController < ApplicationController
  load_and_authorize_resource :user
  load_and_authorize_resource :profile, :through => :user, :singleton => true

  def show
  end

  def edit
  end

  def update
    if @profile.update(profile_params)
      render json: @profile, status: :ok
    else
      render json: @profile.errors, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    params.require(:profile).permit(:name, :street, :avatar, :city,
      :age_range, :field_of_occupation, :receive_newletter, :postal_code)
  end

end
