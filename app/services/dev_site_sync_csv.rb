module Services
  class DevSiteSyncCsv
    DEV_SITE_KEY_MAP = {
      'ADDRESS' => 'address',
      'FOLDERNAME' => 'title',
      'FOLDERDESC' => 'application_type',
      'REFERENCEF' => 'devID',
      'INDATE' => 'received_date',
      'SUBDESC' => 'build_type',
      'STATUSDESC' => 'status',
      'FOLDERDE_1' => 'description',
      'USERNAME' => 'urban_planner_name',
      'EMAILADDRE' => 'urban_planner_email',
      'ORGANIZATI' => 'on_behalf_of'
    }.freeze

    ASSOCIATIONS_TO_UPDATE = %w(application_type status address).freeze

    ATTRIBUTES_TO_UPDATE = %w(title date_received build_type description urban_planner_name urban_planner_email on_behalf_of).freeze

    def initialize(csv_file)
      @lines = read_csv(csv_file).delete_if(&:empty?)
      headers = @lines.delete(@lines.first)
      @keys = headers.map { |key| DEV_SITE_KEY_MAP[key] }
      @dev_sites = @lines.map do |values|
        obj = Hash[@keys.zip(values)]
        obj.delete_if { |key, _value| key.nil? }
      end
    end

    def sync
      @dev_sites.each do |site_params|
        dev_site_id = site_params['devID']
        dev_site = DevSite.find_by(devID: dev_site_id) || DevSite.new(devID: dev_site_id)

        valid = update_dev_site_attributes(dev_site, site_params)

        unless valid
          Rails.logger.info "Unable to sync dev site #{dev_site_id}: #{dev_site.errors.full_messages}"
          next
        end

        valid = update_dev_site_associations(dev_site, site_params)

        Rails.logger.info "Synced dev site #{site_params['devID']}" if valid
      end
    end

    def read_csv(csv_file)
      CSV.open(csv_file).readlines
    end

    def update_dev_site_attributes(dev_site, site_params)
      attributes_to_update = site_params.slice(*ATTRIBUTES_TO_UPDATE)
      guelph = Municipality.find_by(name: 'Guelph')
      ward = Ward.find_or_create_by(name: '[N/A]')
      attributes_to_update[:municipality_id] = guelph.id
      attributes_to_update[:ward_id] = ward.id

      dev_site.update_attributes(attributes_to_update)
    end

    def update_dev_site_associations(dev_site, site_params)
      associations_to_update = site_params.slice(*ASSOCIATIONS_TO_UPDATE)

      ASSOCIATIONS_TO_UPDATE.each do |association|
        send("update_#{association}", dev_site, associations_to_update[association])
      end
    end

    def update_application_type(dev_site, name)
      dev_site.application_types << ApplicationType.create(name: name)
    end

    def update_status(dev_site, status)
      dev_site.statuses << Status.create(status: status, status_date: DateTime.current)
    end

    def update_address(dev_site, address)
      dev_site.addresses << Address.create(street: "#{address.titleize}, Guelph, ON")
    end
  end
end
