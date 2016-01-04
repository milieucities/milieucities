class DevSites::CommentsController < CommentsController
  before_action :set_commentable

  private

    def set_commentable
      @commentable = DevSite.find(params[:dev_site_id])
    end
end
