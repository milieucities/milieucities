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
    message = params.required(:contact_file_lead).permit(:name, :email, :message, :dev_site_id)
    ContactMailer.contact_file_lead(message).deliver_now
    render nothing: true
  end

  def contact_councillor
    message = params.required(:contact_councillor).permit(:name, :email, :message, :dev_site_id)
    ContactMailer.contact_councillor(message).deliver_now
    render nothing: true
  end

  def privacy
  end

  def tos
  end

  def about
  end

end
