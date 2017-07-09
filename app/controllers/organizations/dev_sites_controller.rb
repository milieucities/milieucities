module Organizations
  class DevSitesController < ApplicationController
    load_and_authorize_resource :organization

    def index
      Rails.logger.info "---------------------------------------------_"
      Rails.logger.info "PARAMS => #{params}"
      Rails.logger.info "---------------------------------------------_"
      @no_header = true
      @dev_sites = @organization.dev_sites.includes(:addresses, :statuses, :comments)
      @dev_sites = @dev_sites.search(params[:query]) if params[:query]
      @total = @dev_sites.count
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
  end
end
