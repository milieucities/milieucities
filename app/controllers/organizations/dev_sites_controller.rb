module Organizations
  class DevSitesController < ApplicationController
    load_and_authorize_resource :organization
    SEARCH_SIMILARITY_LIMIT = 0.2

    def index
      @no_header = true
      set_pg_similarity_threshold(SEARCH_SIMILARITY_LIMIT)
      @dev_sites = @organization.dev_sites.includes(:addresses, :statuses, :comments)
      @dev_sites = DevSite.search_by_query(@dev_sites, params[:query]) if params[:query]
      @total = @dev_sites.count(:all)
      paginate

      respond_to do |format|
        format.html
        format.json { render 'dev_sites/index' }
      end
    end

    private

    def paginate
      limit = dev_sites_limit
      page = page_number
      @dev_sites.limit!(limit).offset!(limit * page)
    end

    def dev_sites_limit
      params[:limit].present? ? params[:limit].to_i : 18
    end

    def page_number
      params[:page].present? ? params[:page].to_i : 0
    end

    def set_pg_similarity_threshold(limit)
      ActiveRecord::Base.connection.execute("SELECT set_limit(#{limit});")
    end
  end
end
