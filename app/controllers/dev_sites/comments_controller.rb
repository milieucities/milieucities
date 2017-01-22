module DevSites
  class CommentsController < ApplicationController
    def index
      all_comments = dev_site.comments.includes(:votes, :user)
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

    def destroy
      comment = Comment.find(params[:id])

      raise CanCan::AccessDenied unless can? :delete, comment

      respond_to do |format|
        if comment.destroy
          format.json { head :no_content, status: 204 }
        else
          format.json do
            render json: {
              notice: 'Your comment was not deleted. Please try again.'
            }, status: 500
          end
        end
      end
    end

    def update
      comment = Comment.find(params[:id])

      raise CanCan::AccessDenied unless can? :update, comment

      respond_to do |format|
        if comment.update(body: comment_params[:body])
          format.json { render json: comment, status: 200 }
        else
          format.json do
            render json: {
              notice: 'Your comment was not updated. Please try again.'
            }, status: 500
          end
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
