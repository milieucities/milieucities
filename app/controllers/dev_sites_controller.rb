class DevSitesController < ApplicationController
  load_and_authorize_resource

  def index
    @dev_sites = DevSite.includes(:addresses, :statuses, :comments)
    @dev_sites = @dev_sites.search(search_params) if search?
    @dev_sites = @dev_sites.send(params[:sort]) if sort?
    @total = @dev_sites.count
    paginate

    respond_to do |format|
      format.html
      format.json
    end
  end

  def map
  end

  def images
    render json: { images: @dev_site.image_hash }
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
      format.html { redirect_to dev_sites_path, notice: 'Dev site was successfully destroyed.' }
      format.json { head :no_content }
    end
  end


  private

    def paginate
      if params[:page].present? || params[:limit].present?
        limit = params[:limit].present? ? params[:limit].to_i : 20
        page = params[:page].present? ? params[:page].to_i : 0
        @dev_sites.limit!(limit).offset!(limit * page)
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
