class CommentNotificationMailer < ApplicationMailer
  def flagged_comment_notification(comment)
    @comment = comment
    @dev_site = comment.commentable

    mail(to: MILIEU_EMAIL_ADDRESS, subject: "Comment flagged as offensive")
  end
end
