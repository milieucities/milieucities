class DevSitesController < ApplicationController
  before_action :set_dev_site, only: [:show, :edit, :images, :update, :destroy]
  skip_before_filter :verify_signed_out_user, if: :json_request?

  def index
    if params[:filter].present?
      @dev_sites = DevSite.filter(params[:filter]).joins(:addresses).where.not( addresses: [] )
    else
      @dev_sites = DevSite.all.joins(:addresses).where.not( addresses: [] )
    end

    @locale = params[:locale]

    respond_to do |format|
        format.html
        format.json
    end
  end

  def search
    redirect_to map_path
  end

  def images
    render json: { images: @dev_site.image_hash }
  end

  def geojson
    if params[:filter].present?
      @dev_sites = DevSite.filter(params[:filter]).joins(:addresses).where.not( addresses: [] )
    else
      @dev_sites = DevSite.all.joins(:addresses).where.not( addresses: [] )
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
    @locale = params[:locale]
    if current_user
      @comments = @dev_site.comments.build
    end
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

  def all_devsite_comments
    sid = params[:dev_site_id]
    @comments = Comment.where(dev_site_id: sid)
    respond_to do |format|
      format.json {
                    render :json => ['all_comments_of_devsite' => @comments]
                  }
    end
  end

  def upvote
    @dev_site = DevSite.find(params[:id])
    @dev_site.upvote_by current_user
    redirect_to :back
  end

  def downvote
    @dev_site = DevSite.find(params[:id])
    @dev_site.downvote_by current_user
    redirect_to :back
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
