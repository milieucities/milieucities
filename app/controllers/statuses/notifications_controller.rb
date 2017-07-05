module Statuses
  class NotificationsController < ApplicationController
    load_resource :status
    load_and_authorize_resource :notification, through: :status

    def create
      respond_to do |format|
        if @notification.save
          format.json { render :show, status: :ok }
        else
          format.json { render json: @notification.errors, status: 406 }
        end
      end
    end

    def update
      respond_to do |format|
        if @notification.update(comment_params)
          format.json { render json: @comments, status: 200 }
          format.html do
            flash[:notice] = 'The notification has been updated.'
            redirect_to dev_site_path(@dev_site)
          end
        else
          format.json do
            render json: {
              notice: 'Your notification was not updated. Please try again.'
            }, status: 500
          end
        end
      end
    end

    def destroy
      respond_to do |format|
        if @notification.destroy
          format.json { render json: @notification, status: 204 }
          format.html do
            flash[:notice] = 'The notification has been deleted.'
            redirect_to dev_site_path(@dev_site)
          end
        else
          format.json do
            render json: {
              notice: 'Your notification was not deleted. Please try again.'
            }, status: 500
          end
        end
      end
    end

    def children
      @comments = @notification.children
      respond_to do |format|
        format.json { render :index, status: 200 }
      end
    end

    private

    def notification_params
      params.require(:notification).permit(:id, :send_at, :notification_type, :notice)
    end
  end
end
