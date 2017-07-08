class MeetingsController < ApplicationController
  load_resource :dev_site
  load_resource :status, through: :dev_site
  load_and_authorize_resource :meeting, through: :status, :singleton => true

  def create
    respond_to do |format|
      if @meeting.save
        format.json { render json: @meeting, status: :created }
      else
        format.json { render json: @meeting.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @meeting.update(meeting_params)
        format.json { render json: @meeting, status: :created }
      else
        format.json { render json: @meeting.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @meeting.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  def meeting_params
    params.require(:meeting).permit(:id, :meeting_type, :title, :time, :date, :location, :_destroy)
  end
end
