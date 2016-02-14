class DevSitesController < ApplicationController
  establish_connection DB_OTTAWA
  before_action :set_dev_site, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_signed_out_user, if: :json_request?


  # GET /dev_sites
  # GET /dev_sites.json
  def index
    @dev_sites = DevSite.all

    client_data = {}
    cutoff_date = DateTime.new(2015,01,01)

    @dev_sites.each do |site|
        client_data[site.id] = {}
        client_data[site.id]['id'] = site.id
        client_data[site.id]['development_id'] = site.devID
        client_data[site.id]['application_id'] = site.appID
        client_data[site.id]['image_url'] = site.image_url
        client_data[site.id]['application_type'] = site.application_type
        client_data[site.id]['title'] = site.title
        client_data[site.id]['description'] = site.description
        client_data[site.id]['ward_num'] = site.ward_num
        client_data[site.id]['addresses'] = site.addresses
        client_data[site.id]['statuses'] = site.statuses
        client_data[site.id]['comments'] = site.comments
        client_data[site.id]['hearts'] = site.hearts
    end

    respond_to do |format|
        format.html
        format.json {
                      render :json => ['siteApps' => client_data]
                    }
    end
  end

  # GET /dev_sites/1
  # GET /dev_sites/1.json
  def show
    @dev_site = DevSite.find(params[:id])

    if current_user
      @comments = @dev_site.comments.build
    end
  end

  # GET /dev_sites/new
  def new
    @dev_site = DevSite.new
    @dev_site.addresses.build
    @dev_site.statuses.build
  end

  # GET /dev_sites/1/edit
  def edit
  end

  # POST /dev_sites
  # POST /dev_sites.json
  def create
    @dev_site = DevSite.new(dev_site_params)

    respond_to do |format|
      if @dev_site.save
        format.html { redirect_to @dev_site, notice: 'Dev site was successfully created.' }
        format.json { render :show, status: :created, location: @dev_site }
      else
        format.html { render :new }
        format.json { render json: @dev_site.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /dev_sites/1
  # PATCH/PUT /dev_sites/1.json
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

  # DELETE /dev_sites/1
  # DELETE /dev_sites/1.json
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
    # Use callbacks to share common setup or constraints between actions.
    def set_dev_site
      @dev_site = DevSite.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def dev_site_params
      params.require(:dev_site).permit(:devID, :application_type, :title,
      :description, :ward_name, :ward_num, :image_url, :hearts,
      addresses_attributes: [:lat, :lon, :street],
      statuses_attributes: [:status, :statusdate] )
    end
end
