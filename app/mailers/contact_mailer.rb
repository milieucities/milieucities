class ContactMailer < ApplicationMailer

  def contact_citizencity(name, email, message)
    @name, @email, @message = name, email, message
    mail(:to => 'info@milieu.io', :subject => "Citizen City contact form")
  end

  def contact_milieu(message)
    @name, @email, @message = message.values
    mail(:to => 'info@milieu.io', :subject => "Milieu contact form")
  end

  def contact_file_lead(message)
    @name, @email, @message, @dev_site_id = message.values
    mail(:to => [DevSite.find(@dev_site_id).urban_planner_email], :subject => "Message for File Lead from Milieu.io")
  end

  def contact_councillor(message)
    @name, @email, @message, @dev_site_id = message.values
    mail(:to => [DevSite.find(@dev_site_id).ward_councillor_email], :subject => "Message for Councillor from Milieu.io")
  end

end
