require 'action_view'
require 'watson'
require 'pry'

include ActionView::Helpers::DateHelper
include Services::Watson

class Comment < ActiveRecord::Base
  UNFLAGGED_STATUS = 'UNFLAGGED'.freeze
  FLAGGED_STATUS = 'FLAGGED'.freeze
  APPROVED_STATUS = 'APPROVED'.freeze

  belongs_to :commentable, polymorphic: true
  belongs_to :user
  default_scope { order(created_at: :desc) }
  has_one  :sentiment, as: :sentimentable, dependent: :destroy
  has_many :votes, dependent: :destroy
  validates :body, presence: { message: 'Comment is required' }

  after_save :flag_offensive_comments

  after_save do
    Resque.enqueue(UpdateCommentSentimentJob, id) unless Rails.env.test?
  end

  after_destroy :update_dev_site_sentiment

  def voted_up(current_user)
    !current_user.new_record? && vote_direction(current_user, :up)
  end

  def voted_down(current_user)
    !current_user.new_record? && vote_direction(current_user, :down)
  end

  def last_posted
    time_since_post = "#{time_ago_in_words(updated_at)} ago"
    time_updated_at = updated_at.strftime('%B %e, %Y')
    updated_at > 1.day.ago ? time_since_post : time_updated_at
  end

  def set_sentiment
    create_sentiment if sentiment.blank?
    sentiment_params = sentiment_analysis(body)
    sentiment.update(sentiment_params) if sentiment_params
    update_dev_site_sentiment
  end

  def update_dev_site_sentiment
    commentable.update_sentiment if commentable_type.eql?('DevSite')
  end

  def flag_offensive_comments
    return unless commentable_type.eql?('DevSite') && flagged_as_offensive == UNFLAGGED_STATUS
    return unless contains_offensive_language?
    mark_as_flagged
    notify_admin
  end

  private

  def contains_offensive_language?
    blacklist_en_path = Rails.root.join('lib', 'fixtures', 'blacklist_en.txt')
    blacklist_fr_path = Rails.root.join('lib', 'fixtures', 'blacklist_fr.txt')

    blacklisted_en_words = IO.readlines(blacklist_en_path).map(&:strip)
    blacklisted_fr_words = IO.readlines(blacklist_fr_path).map(&:strip)

    blacklisted_words = blacklisted_en_words + blacklisted_fr_words
    blacklisted_words.any? { |word| body.include? word }
  end

  def mark_as_flagged
    update(flagged_as_offensive: FLAGGED_STATUS)
  end

  def notify_admin
    dev_site = commentable
    planner_email = dev_site.urban_planner_email
    milieu_email = ApplicationMailer::MILIEU_EMAIL_ADDRESS
    recipients = [planner_email, milieu_email]

    recipients.each do |recipient|
      user = User.find_by(email: recipient)
      next unless user.present?

      CommentNotificationMailer.flagged_comment_notification(user, self, dev_site).deliver_later
    end
  end

  def vote_direction(current_user, direction)
    up = direction == :up
    vote = Vote.find_by(user_id: current_user.id, comment_id: id, up: up)
    vote.try(:id)
  end
end
