class CommentsController < ApplicationController
  before_action :signed_in?

  def new
    @comment = @commentable.comments.new
  end

  def upvote
    @comment = Comment.find(params[:id])
    @comment.upvote_by current_user
    redirect_to :back
  end

  def downvote
    @comment = Comment.find(params[:id])
    @comment.downvote_by current_user
    redirect_to :back
  end

end
