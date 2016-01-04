class CommentsController < ApplicationController
  before_action :authenticate_user!

  def new
      @comment = @commentable.comments.new
  end

  def create
    @comment = @commentable.comments.new(comment_params)
    @comment.user_id = current_user.id
    if @comment.save
      redirect_to @commentable, notice: "Your comment was successfully added"
    else
      render :new
      flash[:notice] = "Failed to add comment. Try again"
    end
  end

  private

    def comment_params
      params.require(:comment).permit(:body)
    end
end
