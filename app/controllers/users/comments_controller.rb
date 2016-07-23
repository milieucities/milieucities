class Users::CommentsController < CommentsController
  before_action :set_commentable

  private
  def set_commentable
    @commentable = Comment.find(params[:user_id])
  end
end
