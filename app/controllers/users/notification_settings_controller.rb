module Users
  class NotificationSettingsController < ApplicationController
    load_and_authorize_resource :user
    load_and_authorize_resource :notification_setting, through: :user, singleton: true

    def show; end

    def edit
      @no_header = true
    end

    def update
      if params[:user]
        current_user.update(user_address_params)
      end

      if @notification_setting.update(notification_setting_params)
        render :show, status: :ok
      else
        render json: @notification_setting.errors, status: :unprocessable_entity
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    private

    def notification_setting_params
      params.require(:notification_setting)
        .permit(:newsletter,
                :immediate_vicinity_scope,
                :ward_scope,
                :municipality_scope,
                :secondary_address,
                :project_comments,
                :comment_replies)
    end

    def user_address_params
      params.require(:user).permit(addresses_attributes: [:id, :street, :city])
    end
  end
end
