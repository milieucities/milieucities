class Api::V1::VotesController < Api::V1::ApiController
  before_action :authenticate_request
  before_action :load_comment, only: [:create, :destroy]
  load_and_authorize_resource :current_user
  load_and_authorize_resource :vote, through: :current_user

  def create
    if @comment.voted_up(current_user)
      @vote= Vote.find(@comment.voted_up(current_user))
      @vote.destroy
      render json: {}, status: 204
    elsif @comment.voted_down(current_user)
      @vote= Vote.find(@comment.voted_down(current_user))
      @vote.destroy
      render json: {}, status: 204
    else
      if @vote.save
        render json: @vote, status: :ok
      else
        render json: @vote.errors, status: :unprocessable_entity
      end
    end
  end

  def destroy
    @vote.destroy
    render json: {}, status: 204
  end

  private

  def load_comment
    @comment = Comment.find(params[:comment_id])
  end

  def vote_params
    params.require(:vote).permit(:comment_id, :up)
  end
end
