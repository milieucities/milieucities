class ApiTokenMailer < ApplicationMailer
  default from: MILIEU_EMAIL_ADDRESS

  def send_api_token(user, org, token, expires_at)
    @user = user
    @org = org
    @token = token
    @expires_at = expires_at
    mail(to: user.email, subject: 'Your API token for Milieu')
  end
end
