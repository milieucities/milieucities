module Statuses
  class NotificationsController < ApplicationController
    load_resource :dev_site
    load_resource :status, through: :dev_site
    before_action :load_notification

    def create
      respond_to do |format|
        if @notification.save
          format.json { render json: @notification, status: :created }
        else
          format.json { render json: @notification.errors, status: 406 }
        end
      end
    end

    def update
      respond_to do |format|
        if @notification.update(notification_params)
          format.json { render json: @notification, status: :created }
        else
          format.json { render json: @notification.errors, status: :unprocessable_entity }
        end
      end
    end

    def destroy
      @notification.destroy
      respond_to do |format|
        format.json { head :no_content }
      end
    end

    private

    def notification_params
      params.require(:notification).permit(:id, :send_at, :notification_type, :notice)
    end

    def load_notification
      if params[:id]
        @notification = Notification.find_by(id: params[:id])
      end
      @notification ||= @status.build_notification(notification_params)
    end
  end
end
