require 'action_view'
include ActionView::Helpers::DateHelper

class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true
  belongs_to :user
  default_scope { order(created_at: :desc) }
  has_many :votes, dependent: :destroy
  validates :body, presence: { message: 'Comment is required' }

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

  private

  def vote_direction(current_user, direction)
    up = direction == :up
    vote = Vote.find_by(user_id: current_user.id, comment_id: id, up: up)
    vote.try(:id)
  end
end
