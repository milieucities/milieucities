class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true
  belongs_to :user
  default_scope { order(created_at: :desc) }
  has_many :votes

  validates :body, presence: { message: "Comment is required" }

  def voted_up(current_user)
    !current_user.new_record? && Vote.find_by(user_id: current_user.id, comment_id: id, up: true).try(:id)
  end

  def voted_down(current_user)
    !current_user.new_record? && Vote.find_by(user_id: current_user.id, comment_id: id, up: false).try(:id)
  end
end
