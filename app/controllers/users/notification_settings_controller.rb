module Users
  class NotificationSettingsController < ApplicationController
    load_and_authorize_resource :user
    load_and_authorize_resource :notification_setting, through: :user, singleton: true

    def show; end

    def edit
      @no_header = true
    end

    def update
      if @notification_setting.update(notification_setting_params)
        render :show, status: :ok
      else
        render json: @notification_setting.errors, status: :unprocessable_entity
      end
    end

    private

    def notification_setting_params
      params.require(:notification_setting).permit(:newletter, :updated_dev_site_near_me)
    end
  end
end
