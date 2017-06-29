class MeetingsController < ApplicationController
  load_resource :dev_site
  load_and_authorize_resource :meeting, through: :dev_site

  def create
    respond_to do |format|
      if @meeting.save
        format.json { render json: @meeting, status: :created }
      else
        format.json { render json: @meeting.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
    if @meeting.save
      render json: @meeting, status: :ok
    else
      render json: @meeting.errors, status: :unprocessable_entity
    end
  end

  def destroy
    head :no_content
  end

  private

  def meeting_params
    params.require(:meeting).permit(:id, :meeting_type, :title, :time, :date, :location, :_destroy)
  end
end