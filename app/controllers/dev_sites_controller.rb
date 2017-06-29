class DevSitesController < ApplicationController
  DEFAULT_SITES_LIMIT = 80
  load_and_authorize_resource
  after_action :allow_iframe, only: [:index]

  def index
    @no_header = true
    @dev_sites = DevSite.search(search_params)
    @total = @dev_sites.count
    paginate

    respond_to do |format|
      format.html
      format.json
    end
  end

  def show
    @no_header = true
    @dev_site = DevSite.includes(:addresses, :statuses, :likes).find(params[:id])
    return redirect_to wakefield_path if @dev_site.devID.eql?('wakefield-1') && request.format.html?
  end

  def new
    @application_types = ApplicationType::VALID_APPLICATION_TYPES
    @statuses = @dev_site.valid_statuses
    @no_header = true
  end

  def edit
    @application_types = ApplicationType::VALID_APPLICATION_TYPES
    @statuses = @dev_site.valid_statuses
    @no_header = true
  end

  def create
    respond_to do |format|
      if @dev_site.save
        format.html { redirect_to @dev_site, notice: 'Development successfully created.' }
        format.json { render :show, status: :created, location: @dev_site }
      else
        format.html { render :new, alert: 'Failed to create development.' }
        format.json { render json: @dev_site.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @dev_site.update(dev_site_params)
        format.html { redirect_to @dev_site, notice: 'Development successfully updated.' }
        format.json { render :show, status: :accepted, location: @dev_site }
      else
        format.html { render :edit }
        format.json { render json: @dev_site.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @dev_site.destroy
    respond_to do |format|
      format.html { redirect_to dev_sites_path, notice: 'Development successfully deleted.' }
      format.json { head :no_content }
    end
  end

  private

  def paginate
    limit = dev_sites_limit
    page = page_number
    @dev_sites.limit!(limit).offset!(limit * page)
  end

  def dev_sites_limit
    params[:limit].present? ? params[:limit].to_i : DEFAULT_SITES_LIMIT
  end

  def page_number
    params[:page].present? ? params[:page].to_i : 0
  end

  def search_params
    params.permit(:latitude, :longitude, :year, :ward, :status, :municipality, :featured)
  end

  # rubocop:disable Metrics/MethodLength
  def dev_site_params
    params
      .require(:dev_site)
      .permit(
        :devID,
        :title,
        :address,
        :build_type,
        :description,
        :short_description,
        :urban_planner_name,
        :urban_planner_email,
        :ward_councillor_email,
        :applicant,
        :on_behalf_of,
        :ward_id,
        :municipality_id,
        :received_date,
        :active_at,
        :url_full_notice,
        application_types_attributes: [
          :id,
          :name,
          :_destroy
        ],
        meetings_attributes:
        [
          :id,
          :meeting_type,
          :title,
          :time,
          :date,
          :location,
          :_destroy
        ],
        statuses_attributes: [
          :id,
          :status,
          :status_date,
          :_destroy
        ],
        addresses_attributes: [
          :id,
          :street,
          :city,
          :province_state,
          :country,
          :_destroy
        ],
        images: [],
        files: [],
        likes_attributes: [:id, :user_id, :dev_site_id, :_destroy]
      )
  end

  def allow_iframe
    response.headers.except! 'X-Frame-Options'
    # response.headers['X-Frame-Options'] = 'ALLOW-FROM http://guelph.ca'
  end
end
