class CommentsController < ApplicationController
  load_and_authorize_resource

  def index
    @comments = Comment.all
    @dev_sites = DevSite.all
    respond_to do |format|
        format.html
        format.json
    end
  end

  def new
    @comment = @commentable.comments.new
  end

end
