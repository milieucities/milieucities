class Events::CommentsController < CommentsController
  before_action :set_commentable

  def index
    @event = Event.find(params[:event_id])
    render json: @event.comments.to_json(include: :user)
  end

  def create
    @event = Event.find(params[:event_id])
    @comment = @commentable.comments.new(comment_params)
    @comment.user_id = current_user.id
    @comment.event_id = params[:dev_site_id]
    respond_to do |format|
      if @comment.save
        format.html { redirect_to @commentable, notice: "Your comment was successfully added" }
        format.json { render json: @event.comments.to_json(include: :user), status: 200 }
      else
        format.html { redirect_to event_path(@comment.event_id), notice: "Failed to add comment. Try again" }
        format.json { render json: @comment.errors, status: 422 }
      end
    end
  end


  private

    def comment_params
      params.require(:comment).permit(:body, :event_id, :user_id)
    end

    def set_commentable
      @commentable = Event.find(params[:event_id])
    end
end
