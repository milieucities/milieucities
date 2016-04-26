class ContactMailer < ApplicationMailer

  def contact_citizencity(name, email, message)
    @name, @email, @message = name, email, message
    mail(:to => 'info@milieu.io', :subject => "Citizen City contact form")
  end

end