class StatusesController < ApplicationController
  load_resource :dev_site
  load_and_authorize_resource :status, through: :dev_site

  def create
    respond_to do |format|
      if @status.save
        format.json { render json: @status, status: :created }
      else
        format.json { render json: @status.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @status.update(status_params)
        format.json { render json: @status, status: :created }
      else
        format.json { render json: @status.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @status.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  def status_params
    params.require(:status).permit(:id, :status, :start_date, :end_date, :_destroy)
  end
end
