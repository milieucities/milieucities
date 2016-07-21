class CommentsController < ApplicationController
  before_action :signed_in?

  def index
    @comments = Comment.all
    @dev_sites = DevSite.all
    respond_to do |format|
        format.html
        format.json
    end
  end

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
