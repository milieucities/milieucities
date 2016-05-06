class ApplicationMailer < ActionMailer::Base
  default from: ENV['SMTP_USER']
  layout 'mailer'
end
