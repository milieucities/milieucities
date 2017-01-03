module DevSites
  class CommentsController < CommentsController
    def index
      @dev_site = DevSite.find(params[:dev_site_id])
      @comments = @dev_site.comments

      @total = @comments.count

      if params[:page].present? || params[:limit].present?
        limit = params[:limit].present? ? params[:limit].to_i : 5
        page = params[:page].present? ? params[:page].to_i : 0
        @comments = @comments.limit(limit).offset(limit * page)
      end

      render formats: :json
    end

    def create
      @dev_site = DevSite.find(params[:dev_site_id])
      @comment = @dev_site.comments.build comment_params
      @comment.user_id = current_user.id

      respond_to do |format|
        if @comment.save
          format.json { render :show, status: :ok }
        else
          format.json { render json: @comment.errors, status: 406 }
        end
      end
    end

    private

    def comment_params
      params.require(:comment).permit(:body, :dev_site_id, :user_id)
    end
  end
end
