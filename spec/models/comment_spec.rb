require 'spec_helper'

describe Comment do
  let(:dev_site) { create(:dev_site) }

  context 'comment contains offensive language' do
    it 'should mark the comment as flagged' do
      comment = Comment.create(body: 'Fuck this shit', commentable_type: 'DevSite', commentable_id: dev_site.id )

      expect(comment.flagged_as_offensive).to be true
    end

    it 'should notify admin' do
      expect(CommentNotificationMailer).to receive(:flagged_comment_notification)
        .and_return(double 'mailer', deliver_later: true)

      comment = Comment.create(body: 'Fuck this shit', commentable_type: 'DevSite', commentable_id: dev_site.id )
    end
  end

  context 'comment has no offensive language' do
    it 'should not flag the comment' do
      comment = Comment.create(body: 'Puppies are cute', commentable_type: 'DevSite', commentable_id: dev_site.id )

      expect(comment.flagged_as_offensive).to be false
    end
  end
end