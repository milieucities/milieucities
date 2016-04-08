class Api::V1::DevSitesController < Api::ApiController
  respond_to :json

  before_action :authenticate

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

    respond_with client_data



  end


end