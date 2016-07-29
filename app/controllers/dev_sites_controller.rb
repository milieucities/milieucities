class DevSitesController < ApplicationController
  load_and_authorize_resource
  before_action :set_dev_site, only: [:show, :edit, :images, :update, :destroy]

  def index
    @dev_sites = DevSite.includes(:addresses, :statuses, :comments)
    if params[:filter].present?
      @dev_sites = @dev_sites.filter(params[:filter]).where.not( addresses: [] )
    else
      @dev_sites = @dev_sites.all.where.not( addresses: [] )
    end

    if params[:page].present? || params[:limit].present?
      limit = params[:limit].present? ? params[:limit].to_i : 20
      page = params[:page].present? ? params[:page].to_i : 0
      @dev_sites.limit!(limit).offset!(limit * page)
    end

    respond_to do |format|
        format.html
        format.json
    end
  end

  def map
    render layout: "no_nav"
  end

  def search
    #TODO
    redirect_to map_path
  end

  def images
    render json: { images: @dev_site.image_hash }
  end

  def geojson
    @dev_sites = DevSite.includes(:addresses, :statuses, :comments)
    if params[:filter].present?
      @dev_sites = @dev_sites.filter(params[:filter]).where.not( addresses: [] )
    else
      @dev_sites = @dev_sites.all.where.not( addresses: [] )
    end

    if params[:page].present? || params[:limit].present?
      limit = params[:limit].present? ? params[:limit].to_i : 20
      page = params[:page].present? ? params[:page].to_i : 0
      @dev_sites.limit!(limit).offset!(limit * page)
    end

    @geojson = []

    @dev_sites.each do |ds|
      address = ds.addresses.first
      next unless address

      @geojson << {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [address.geocode_lon, address.geocode_lat]
        },
        properties: {
          id: ds.id,
          zoom: 9,
          title: ds.title,
          address: address,
          :'marker-symbol' => ds.marker,
          description: "<div class=\"marker-title\"><a href=\"/#{params[:locale]}/dev_sites/#{ds.id}\">#{ds.title}</a></div>Status: #{ds.status}"
        }
      }
    end

    render json: @geojson
  end

  def show
  end

  def new
    @dev_site = DevSite.new
    @dev_site.addresses.build
    @dev_site.statuses.build
  end

  def edit
  end

  def create
    @dev_site = DevSite.new(dev_site_params)

    respond_to do |format|
      if @dev_site.save
        format.html { redirect_to @dev_site, notice: 'Development site was successfully created.' }
        format.json { render :show, status: :created, location: @dev_site }
      else
        format.html { render :new }
        format.json { render json: @dev_site.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @dev_site.update(dev_site_params)
        format.html { redirect_to @dev_site, notice: 'Dev site was successfully updated.' }
        format.json { render :show, status: :ok, location: @dev_site }
      else
        format.html { render :edit }
        format.json { render json: @dev_site.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @dev_site.destroy
    respond_to do |format|
      format.html { redirect_to map_path, notice: 'Dev site was successfully destroyed.' }
      format.json { head :no_content }
    end
  end


  private
    def set_dev_site
      @dev_site = DevSite.find(params[:id])
    end

    def dev_site_params
      params.require(:dev_site).permit(:devID, :application_type, :title, :images_cache, :files_cache, :build_type,
      :description, :ward_councillor_email, :urban_planner_email, :ward_name, :ward_num, :image_url, :hearts, {images: []}, {files: []},
      addresses_attributes: [:id, :lat, :lon, :street, :_destroy],
      statuses_attributes: [:id, :status, :status_date, :_destroy] )
    end
end
