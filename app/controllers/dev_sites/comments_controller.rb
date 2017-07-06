module DevSites
  class CommentsController < ApplicationController
    load_resource :dev_site
    around_action :authenticate_with_token, only: [:update, :destroy], if: :contains_token
    load_and_authorize_resource :comment, through: :dev_site
    before_action :load_resource, only: [:update, :destroy, :children]

    def index
      @total = @comments.count
      @comments = @comments.root.clean.includes(:votes, :user)
      @comments = paginate(@comments, 5)
    end

    def show; end

    def create
      update_user if user_params[:accepted_privacy_policy].present?
      respond_to do |format|
        if @comment.save
          format.json { render :show, status: :ok }
        else
          format.json { render json: @comment.errors, status: 406 }
        end
      end
    end

    def update
      respond_to do |format|
        if @comment.update(comment_params)
          format.json { render json: @comments, status: 200 }
          format.html do
            flash[:notice] = 'The comment has been updated.'
            redirect_to dev_site_path(@dev_site)
          end
        else
          format.json do
            render json: {
              notice: 'Your comment was not updated. Please try again.'
            }, status: 500
          end
        end
      end
    end

    def destroy
      respond_to do |format|
        if @comment.destroy
          format.json { render json: @comment, status: 204 }
          format.html do
            flash[:notice] = 'The comment has been deleted.'
            redirect_to dev_site_path(@dev_site)
          end
        else
          format.json do
            render json: {
              notice: 'Your comment was not deleted. Please try again.'
            }, status: 500
          end
        end
      end
    end

    def children
      @comments = @comment.children
      respond_to do |format|
        format.json { render :index, status: 200 }
      end
    end

    private

    def update_user
      user = current_user
      Rails.logger.info "ACCEPTED => #{user_params[:accepted_privacy_policy]}"
      user.update(accepted_privacy_policy: user_params[:accepted_privacy_policy])
    end

    def comment_params
      params.require(:comment).permit(:body,
                                      :commentable_id,
                                      :commentable_type,
                                      :user_id,
                                      :parent_id,
                                      :flagged_as_offensive)
    end

    def user_params
      params.require(:user).permit(:accepted_privacy_policy)
    end

    def load_resource
      @comment ||= Comment.find_by(id: params[:comment_id]) if params[:comment_id]
    end
  end
end
