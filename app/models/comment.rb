class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true

  def find_user(user_id)
    User.find(user_id)
  end
end
