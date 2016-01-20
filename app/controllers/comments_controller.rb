class CommentsController < ApplicationController
  before_action :authenticate_user!
  # acts_as_token_authentication_handler_for User
  def new
      @comment = @commentable.comments.new
  end

  def create
    @comment = @commentable.comments.new(comment_params)
    @comment.user_id = current_user.id
    @comment.dev_site_id = params[:dev_site_id]
    respond_to do |format|
      if @comment.save
        format.html { redirect_to @commentable, notice: "Your comment was successfully added" }
        format.json {
                      render :json => [
                        "status" => 200,
                        "message" => "Added Comment to dev_site_id: #{@comment.dev_site_id}",
                        "by_user" => "#{current_user.email} (user_id: #{current_user.id})",
                        "comment" => comment_params
                      ]
                    }
      else
        format.html {
                      render :new
                      flash[:notice] = "Failed to add comment. Try again"
                    }
        format.json {
                      render :json => ['status': 401]
                    }
      end
    end
  end

  def all_user_comments
    auth_token = params[:auth_token]
    uid = User.where(authentication_token: auth_token).first.id
    @comments = Comment.where(user_id: uid)
    respond_to do |format|
      format.json {
                    render :json => ['all_comments_by_user' => @comments]
                  }
    end
  end

  private

    def comment_params
      params.require(:comment).permit(:body)
    end
end
