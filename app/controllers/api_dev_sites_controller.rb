class ApiDevSitesController < ApiController
  #load_and_authorize_resource

  def index
    @api_dev_sites = DevSite.includes(:addresses, :statuses, :comments)
    @api_dev_sites = @api_dev_sites.search(search_params) if search?
    @api_dev_sites = @api_dev_sites.send(params[:sort]) if sort?
    @total = @api_dev_sites.count
    paginate

    render json: @api_dev_sites
  end

  def map
  end

  def images
    render json: { images: @api_dev_site.image_hash }
  end

  def show
  end

  def new
    @api_dev_site = DevSite.new
    @api_dev_site.addresses.build
    @api_dev_site.statuses.build
  end

  def edit
  end

  def create
    @api_dev_site = DevSite.new(dev_site_params)
    if @api_dev_site.save
      render :show, status: :created, location: @api_dev_site
    else
      render json: @api_dev_site.errors, status: :unprocessable_entity
    end
  end

  def update
    if @api_dev_site.update(dev_site_params)
      render :show, status: :accepted, location: @api_dev_site
    else
      render json: @api_dev_site.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @api_dev_site.destroy
    head :no_content
  end


  private
    def set_dev_site
      @api_dev_site = DevSite.find(params[:id])
    end

    def paginate
      if params[:page].present? || params[:limit].present?
        limit = params[:limit].present? ? params[:limit].to_i : 20
        page = params[:page].present? ? params[:page].to_i : 0
        @api_dev_sites.limit!(limit).offset!(limit * page)
      end
    end

    def sort?
      params[:sort].present?
    end

    def search?
      ((params[:latitude].present? && params[:longitude].present?) ||
      params[:year].present? ||
      params[:ward].present? ||
      params[:status].present? )
    end

    def search_params
      params.permit(:latitude, :longitude, :year, :ward, :status)
    end

    def dev_site_params
      params.require(:dev_site).permit(:devID, :application_type, :title, :images_cache, :files_cache, :build_type,
      :description, :ward_councillor_email, :urban_planner_email, :ward_name, :ward_num, :image_url, :hearts, {images: []}, {files: []},
      likes_attributes: [:id, :user_id, :dev_site_id, :_destroy],
      addresses_attributes: [:id, :lat, :lon, :street, :_destroy],
      statuses_attributes: [:id, :status, :status_date, :_destroy] )
    end
end
