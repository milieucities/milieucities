class ProfilesController < ApplicationController
  load_and_authorize_resource :user
  load_and_authorize_resource :profile, :through => :user, :singleton => true

  def show
  end

  def update
    respond_to do |format|
      if @profile.update(profile_params)
        format.html { redirect_to @profile.user, notice: 'Your profile was successfully updated.' }
        format.json { render json: @profile, status: :ok }
      else
        format.html { render :edit }
        format.json { render json: @profile.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def profile_params
    params.require(:profile).permit(:name)
  end

end
