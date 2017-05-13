class CommentNotificationMailer < ApplicationMailer
  def flagged_comment_notification(recipient, comment, dev_site)
    @comment = comment
    @dev_site = dev_site
    @recipient = recipient

    @token = recipient.generate_auth_token
    @approve_comment_url = generate_approve_comment_url
    @reject_comment_url = generate_reject_comment_url
    @name = @recipient.name_from_profile

    mail(to: recipient.email, subject: 'Comment flagged as offensive')
  end

  def generate_approve_comment_url
    host = host_map[Rails.env]
    root_url = Rails.application.routes.url_helpers.dev_site_comment_approve_url(dev_site_id: @dev_site.id, comment_id: @comment.id, host: host)
    query = {
      email: @recipient.email,
      token: @token,
      comment: {
        flagged_as_offensive: Comment::APPROVED_STATUS
      }
    }.to_query

    "#{root_url}?#{query}"
  end

  def generate_reject_comment_url
    host = host_map[Rails.env]
    root_url = Rails.application.routes.url_helpers.dev_site_comment_reject_url(dev_site_id: @dev_site.id, comment_id: @comment.id, host: host)

    query = {
      email: @recipient.email,
      token: @token
    }.to_query

    "#{root_url}?#{query}"
  end

  def host_map
    {
      'development' => 'http://localhost:3000',
      'test' => 'http://localhost:3000',
      'production' => 'https://cities.milieu.io'
    }
  end
end
