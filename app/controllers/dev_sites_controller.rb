class DevSitesController < ApplicationController
  before_action :set_dev_site, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_signed_out_user, if: :json_request?

  def index
    @dev_sites = DevSite.all

    respond_to do |format|
        format.html
        format.json
    end
  end

  def geojson
    @dev_sites = DevSite.all
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
          address: address.street,
          :'marker-symbol' => "marker",
          description: "<div class=\"marker-title\"><a href=\"/dev_sites/#{ds.id}\">#{ds.title}</a></div>Status: #{ds.status}"
        }
      }
    end

    render json: @geojson
  end

  def xml_data
    @dev_sites = DevSite.all
  end

  def show
    @dev_site = DevSite.find(params[:id])

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
      format.html { redirect_to dev_sites_url, notice: 'Dev site was successfully destroyed.' }
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

  def heart
    DevSite.increment_counter(:hearts, params[:dev_site_id])
    respond_to do |format|
      format.json {
        render :json => [
          'dev_site_id' => params[:dev_site_id],
          'total_hearts' => DevSite.find(params[:dev_site_id]).hearts
        ]
      }
    end
  end

  def break_heart
    DevSite.decrement_counter(:hearts, params[:dev_site_id])
    respond_to do |format|
      format.json {
        render :json => [
          'dev_site_id' => params[:dev_site_id],
          'total_hearts' => DevSite.find(params[:dev_site_id]).hearts
        ]
      }
    end
  end

  private
    def set_dev_site
      @dev_site = DevSite.find(params[:id])
    end

    def dev_site_params
      params.require(:dev_site).permit(:devID, :application_type, :title,
      :description, :ward_name, :ward_num, :image_url, :hearts,
      addresses_attributes: [:lat, :lon, :street],
      statuses_attributes: [:status, :statusdate] )
    end
end
