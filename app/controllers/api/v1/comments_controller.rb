class Api::V1::CommentsController < Api::V1::ApiController
  before_action :authenticate_request

  def index
    render json: comment_list()
  end

  def show
    comment = Comment.find(params[:id])
    if comment.present?
      render json: comment_single(comment)
    else
      error = RespMsg.new(404, "Requested comment does not exist")
      render json: error.to_json, status: 404
    end
  end

  def update
    comment = Comment.find(params[:id])
    if comment.user_id == @current_user.id
      comment.body = params[:body]
      comment.save
      render json: comment_list()
    else
      error = RespMsg.new(401, "You are not allowed to edit this comment")
      render json: error.to_json, status: 401
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    if comment.user_id == @current_user.id
      comment.destroy
      render json: comment_list()
    else
      error = RespMsg.new(401, "You are not allowed to destroy this comment")
      render json: error.to_json, status: 401
    end
  end

  def create
    dev_site = DevSite.find(params[:dev_site_id])
    comment = Comment.create(:commentable => dev_site, :user => @current_user, :body => params[:body])
    render json: comment_list()
  end

  private
  def comment_list()
    comments = Comment.where(commentable_id: params[:dev_site_id])
    reformat_comment(comments)
  end

  def comment_single(comment)
    reformat_comment(comment)
  end

  def reformat_comment(comment)
    comment.as_json(
      :include =>
        {:user =>
          {:include =>
            {:profile =>
              {:only => [:name, :anonymous_comments]}},
        :only => :id}},
      :only => [:id, :body, :created_at, :vote_count, :total])
  end
end
