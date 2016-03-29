class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true
  belongs_to :user

  # Validations
  validates :body, presence: { message: "Comment is required" }

  def find_user(user_id)
    User.find(user_id)
  end
end
