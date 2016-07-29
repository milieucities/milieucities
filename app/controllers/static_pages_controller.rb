class StaticPagesController < ApplicationController

  def home
    @no_header = true
    respond_to do |format|
      format.html
      format.json { head :no_content }
    end
  end

  def events
  end

  def map
  end

  def citizencity
    @no_header = true
  end

  def contact_citizencity
    ContactMailer.contact_citizencity(params[:name], params[:email], params[:message]).deliver_now
    render nothing: true
  end

  def contact_milieu
    message = params.required(:contact_milieu).permit(:name, :email, :message)
    ContactMailer.contact_milieu(message).deliver_now
    render nothing: true
  end

  def contact_file_lead
    if params[:contact_file_lead].present?
      message = params.required(:contact_file_lead).permit(:name, :email, :message, :dev_site_id)
    else
      message = params.permit(:name, :email, :message, :dev_site_id)
    end

    ContactMailer.contact_file_lead(message).deliver_now
    render json: {}
  end

  def contact_councillor
    if params[:contact_councillor].present?
      message = params.required(:contact_councillor).permit(:name, :email, :message, :dev_site_id)
    else
      message = params.permit(:name, :email, :message, :dev_site_id)
    end

    ContactMailer.contact_councillor(message).deliver_now
    render json: {}
  end

  def privacy
  end

  def tos
  end

  def about
  end

end
