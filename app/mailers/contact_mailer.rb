class ContactMailer < ApplicationMailer

  def contact_citizencity(name, email, message)
    @name, @email, @message = name, email, message
    mail(:to => 'meneliktucker@gmail.com', :subject => "Citizen City contact form")
  end

  def contact_milieu(name, email, message)
    @name, @email, @message = name, email, message
    mail(:to => 'meneliktucker@gmail.com', :subject => "Milieu contact form")
  end

  def contact_file_lead(name, email, message, devId)
    @name, @email, @message, @devId = name, email, message, devId
    mail(:to => [DevSite.find(devId).urban_planner_email], :subject => "Message for File Lead from Milieu")
  end

  def contact_councillor(name, email, message, devId)
    @name, @email, @message, @devId = name, email, message, devId
    mail(:to => [DevSite.find(devId).ward_councillor_email], :subject => "Message for Councillor from Milieu")
  end

end
