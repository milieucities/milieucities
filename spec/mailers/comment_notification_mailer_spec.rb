require 'spec_helper'
require "#{Rails.root}/app/services/url_generator.rb"

describe CommentNotificationMailer do
  let(:urban_planner_email) { 'urbanplanner@mailinator.com' }
  let(:urban_planner) { create(:user, email: urban_planner_email) }
  let(:dev_site) { create(:dev_site, urban_planner_email: urban_planner_email) }
  let(:comment) do
    create(:comment,
           body: 'inappropriate comment',
           commentable_type: 'DevSite',
           commentable_id: dev_site.id,
           flagged_as_offensive: Comment::FLAGGED_STATUS)
  end

  describe '#flagged_comment_notification' do
    it 'should generate an email to notify recipient of flagged comment' do
      expect(Services::UrlGenerator).to receive(:generate_approve_comment_url)
        .and_return('approve url')
      expect(Services::UrlGenerator).to receive(:generate_reject_comment_url)
        .and_return('reject url')

      mail = CommentNotificationMailer.flagged_comment_notification(urban_planner,
                                                                    comment,
                                                                    dev_site)

      expect(mail.to).to eq([urban_planner_email])
      expect(mail.from).to eq([ContactMailer::MILIEU_EMAIL_ADDRESS])
      expect(mail.subject).to eq('Comment flagged as offensive')
      expect(mail.respond_to?(:deliver_later)).to be true
    end
  end
end
