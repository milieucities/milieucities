class CommentNotificationMailer < ApplicationMailer
  def flagged_comment_notification(recipient, comment, dev_site)
    @comment = comment
    @dev_site = dev_site

    url_opts = {
      dev_site_id: @dev_site.id,
      comment_id: @comment.id,
      email: recipient.email,
      token: recipient.generate_auth_token.token
    }

    @approve_comment_url = Services::UrlGenerator.generate_approve_comment_url(url_opts)
    @reject_comment_url = Services::UrlGenerator.generate_reject_comment_url(url_opts)
    @name = recipient.name_from_profile || 'Milieu admin'

    mail(to: recipient.email, subject: 'Comment flagged as offensive')
  end
end
