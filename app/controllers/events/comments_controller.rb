module Events
  class CommentsController < CommentsController
    before_action :set_commentable

    def index
      @event = Event.find(params[:event_id])
      render json: @event.comments.to_json(include: :user)
    end

    def create
      # TODO: needs translations
      success_message = 'Your comment was successfully added'
      failure_message = 'We were unable to add your comment. Please try again.'
      create_event_comment
      respond_to do |format|
        if @comment.save
          format.html { redirect_to @commentable, notice: success_message }
          format.json { render json: @event.comments.to_json(include: :user), status: 200 }
        else
          format.html { redirect_to event_path(@comment.event_id), notice: failure_message }
          format.json { render json: @comment.errors, status: 422 }
        end
      end
    end

    private

    def create_event_comment
      @event = Event.find(params[:event_id])
      @comment = @commentable.comments.new(comment_params)
      @comment.user_id = current_user.id
      @comment.event_id = params[:dev_site_id]
    end

    def comment_params
      params.require(:comment).permit(:body, :event_id, :user_id)
    end

    def set_commentable
      @commentable = Event.find(params[:event_id])
    end
  end
end
