class CommentsController < ApplicationController
  before_action :authenticate_user!

  def new
      @comment = @commentable.comments.new
  end

  def create
    @comment = @commentable.comments.new(comment_params)
    @comment.user_id = current_user.id
    @comment.dev_site_id = params[:dev_site_id]
    if @comment.save
      redirect_to @commentable, notice: "Your comment was successfully added"
    else
      render :new
      flash[:notice] = "Failed to add comment. Try again"
    end
  end

  def all_user_comments
    uid = current_user.id
    @comments = Comment.where(user_id: uid)
    respond_to do |format|
      format.json {
                    render :json => ['all_comments_by_user' => @comments]
                  }
    end
  end

  def all_devsite_comments
    sid = params[:dev_site_id]
    @comments = Comment.where(dev_site_id: sid)
    respond_to do |format|
      format.json {
                    render :json => ['all_comments_of_devsite' => @comments]
                  }
    end
  end

  private

    def comment_params
      params.require(:comment).permit(:body)
    end
end
