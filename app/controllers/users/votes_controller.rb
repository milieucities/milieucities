module Users
  class VotesController < ApplicationController
    load_and_authorize_resource :user
    load_and_authorize_resource :vote, through: :user

    def create
      if @vote.save
        render json: @vote, status: :ok
      else
        render json: @vote.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @vote.destroy
      render json: {}, status: 200
    end

    private

    def vote_params
      params.require(:vote).permit(:comment_id, :up)
    end

    def vote_exists
      Vote.find_by(user_id: current_user.id,
                   comment_id: vote_params[:comment_id],
                   up: vote_params[:up]).exists?
    end
  end
end
