class CommentsController < ApplicationController
  before_action :signed_in?

  # Voting
  # acts_as_votable

  def index
    @dev_site = DevSite.find(params[:dev_site_id])
    render json: @dev_site.comments.to_json(include: :user)
  end

  def new
    @comment = @commentable.comments.new
  end

  def create
    @dev_site = DevSite.find(params[:dev_site_id])
    @comment = @commentable.comments.new(comment_params)
    @comment.user_id = current_user.id
    @comment.dev_site_id = params[:dev_site_id]
    respond_to do |format|
      if @comment.save
        format.html { redirect_to @commentable, notice: "Your comment was successfully added" }
        format.json { render json: @dev_site.comments.to_json(include: :user), status: 200 }
      else
        format.html { redirect_to dev_site_path(@comment.dev_site_id), notice: "Failed to add comment. Try again" }
        format.json { render json: @comment.errors, status: 406 }
      end
    end
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

  private

    def comment_params
      params.require(:comment).permit(:body, :dev_site_id, :user_id)
    end
end
