module DevSites
  class CommentsController < ApplicationController
    def index
      all_comments = dev_site.comments
      @total = all_comments.count

      @comments = paginate? ? paginate(all_comments, 5) : all_comments

      render formats: :json
    end

    def show; end

    def create
      @comment = dev_site.comments.build comment_params
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

    def paginate?
      params[:page].present? || params[:limit].present?
    end

    def comment_params
      params.require(:comment).permit(:body, :dev_site_id, :user_id)
    end

    def dev_site
      @dev_site ||= DevSite.find(params[:dev_site_id])
    end
  end
end
