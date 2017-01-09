class PagesController < ApplicationController
  def home
    @no_header = true
  end

  def map
  end

  def citizencity
    @no_header = true
  end

  def contact_citizencity
    mailer = ContactMailer.contact_citizencity(params[:name],
                                               params[:email],
                                               params[:message])
    mailer.deliver_now
    render nothing: true
  end

  def contact_milieu
    message = contact_milieu_params
    ContactMailer.contact_milieu(message).deliver_now
    render nothing: true
  end

  def contact_file_lead
    message = contact_file_lead_params
    ContactMailer.contact_file_lead(message).deliver_now
    render json: {}
  end

  def contact_councillor
    message = contact_councillor_params
    ContactMailer.contact_councillor(message).deliver_now
    render json: {}
  end

  def about
  end

  private

  def contact_milieu_params
    params.required(:contact_milieu).permit(:name, :email, :message)
  end

  def contact_file_lead_params
    if params[:contact_file_lead].present?
      params.required(:contact_file_lead)
        .permit(:name, :email, :message, :dev_site_id)
    else
      params.permit(:name, :email, :message, :dev_site_id)
    end
  end

  def contact_councillor_params
    if params[:contact_councillor].present?
      params.required(:contact_councillor)
        .permit(:name, :email, :message, :dev_site_id)
    else
      params.permit(:name, :email, :message, :dev_site_id)
    end
  end
end
