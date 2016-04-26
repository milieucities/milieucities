class ContactMailer < ApplicationMailer

  def contact_citizencity(name, email, message)
    @name, @email, @message = name, email, message
    mail(:to => 'meneliktucker@hotmail.com', :subject => "Email from Citizen City contact form")
  end

end