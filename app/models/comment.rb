require 'action_view'
include ActionView::Helpers::DateHelper

class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true
  belongs_to :user
  default_scope { order(created_at: :desc) }
  has_many :votes, dependent: :destroy

  validates :body, presence: { message: "Comment is required" }

  def voted_up(current_user)
    !current_user.new_record? && Vote.find_by(user_id: current_user.id, comment_id: id, up: true).try(:id)
  end

  def voted_down(current_user)
    !current_user.new_record? && Vote.find_by(user_id: current_user.id, comment_id: id, up: false).try(:id)
  end

  def last_posted
    if updated_at > 1.day.ago
      return time_ago_in_words(updated_at)
    else
      return updated_at.strftime("%B %e, %Y")
    end
  end
end
