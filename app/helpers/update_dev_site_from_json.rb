require 'pry'

class UpdateDevSiteFromJson
  prepend SimpleCommand

  ATTRIBUTES_TO_PROCESS = [:ward, :municipality].freeze
  REQUIRED_FIELDS = [:dev_site_id, :ward, :municipality, :addresses_attributes, :application_types_attributes, :statuses_attributes].freeze

  def initialize(dev_sites)
    @dev_sites = dev_sites
    @results_obj = { failed: [], success: [] }
  end

  def call
    if @dev_sites.nil?
      errors.add(:sync, 'An array of dev sites must be provided')
      return
    end

    @dev_sites.each do |site_params|
      update_dev_site(site_params)
    end

    @results_obj
  end

  private

  def update_dev_site(site_params)
    result = { dev_site_id: site_params[:dev_site_id] }

    REQUIRED_FIELDS.each do |field|
      if site_params[field].nil?
        result[:status] = 'error'
        result[:message] = "#{field} is a required field"
        @results_obj[:failed] << result
        return
      end
    end

    dev_site = DevSite.find_by(devID: site_params[:dev_site_id])
    if dev_site
      result[:status] = 'updated'
    else
      dev_site = DevSite.new(devID: site_params[:dev_site_id])
      result[:status] = 'created'
    end

    ATTRIBUTES_TO_PROCESS.each do |attr|
      dev_site, result = send("update_#{attr}", dev_site, site_params[attr], result)
      if result[:status] == 'error'
        @results_obj[:failed] << result
        return
      end
    end

    updated = dev_site.update_attributes(site_params.except(:dev_site_id, *ATTRIBUTES_TO_PROCESS))

    if updated
      @results_obj[:success] << result
    else
      result[:status] = 'error'
      result[:message] = dev_site.errors.full_messages.join(', ')
      @results_obj[:failed] << result
    end
  end

  def update_ward(dev_site, ward_param, result)
    ward = Ward.find_by(name: ward_param)
    if !ward
      result[:status] = 'error'
      result[:message] = "Unable to find Ward #{ward_param}"
    else
      dev_site.ward = ward
    end

    return dev_site, result
  end

  def update_municipality(dev_site, municipality_param, result)
    municipality = Municipality.find_by(name: municipality_param)
    if !municipality
      result[:status] = 'error'
      result[:message] = "Unable to find Municipality #{municipality_param}"
    else
      dev_site.municipality = municipality
    end

    return dev_site, result
  end
end