module Organizations
  class MembershipsController < ApplicationController
    load_and_authorize_resource :organization

    def create
      member_email = membership_params[:user][:email]

      member = User.find_by(email: member_email)

      unless member
        message = 'There is no user with this email address'
        render(json: { message: message, status: :unprocessable_entity }) && return
      end

      membership_exists = @organization.users.find_by(id: member.id)

      if membership_exists
        message = 'This user is already a member of the organization'
        render(json: { message: message, status: :unprocessable_entity }) && return
      end

      @organization.users << member

      if @organization.save
        render json: { status: :ok }
      else
        error_message = @organization.errors.full_messages.join(', ')
        render json: { message: error_message, status: :unprocessable_entity }
      end
    end

    def destroy
      if @organization.memberships.find_by(id: params[:id]).destroy
        render json: { status: :ok }
      else
        error_message = 'Unable to delete member, please try again.'
        render json: { message: error_message, status: :unprocessable_entity }
      end
    end

    def membership_params
      params.require(:membership).permit(user: [:email])
    end
  end
end
