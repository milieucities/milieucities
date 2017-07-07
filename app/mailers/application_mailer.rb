class ApplicationMailer < ActionMailer::Base
  MILIEU_EMAIL_ADDRESS = 'info@milieu.io'.freeze
  NOTIFICATION_EMAIL_ADDRESS = 'notifications@milieu.io'.freeze

  default from: NOTIFICATION_EMAIL_ADDRESS
  layout 'mailer'
end
