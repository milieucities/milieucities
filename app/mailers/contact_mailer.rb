class ContactMailer < ApplicationMailer

  def contact_citizencity(name, email, message)
    @name, @email, @message = name, email, message
    mail(:to => 'info@milieu.io', :subject => "Citizen City contact form")
  end

  def contact_milieu(name, email, message)
    @name, @email, @message = name, email, message
    mail(:to => 'info@milieu.io', :subject => "Milieu contact form")
  end

end