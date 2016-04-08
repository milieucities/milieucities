class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true
  belongs_to :user

  def find_user(user_id)
    User.find(user_id)
  end
end
