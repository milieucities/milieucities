module Services
  class DevSiteSyncCsv
    DEV_SITE_KEY_MAP = {
      'ADDRESS' => 'address',
      'ADDID' => 'devID',
      'FOLDERNAME' => 'title',
      'FOLDERDESC' => 'application_type',
      'REFERENCEF' => 'file_number',
      'INDATE' => 'received_date',
      'SUBDESC' => 'build_type',
      'STATUSDESC' => 'status',
      'FOLDERDE_1' => 'short_description',
      'USERNAME' => 'urban_planner_name',
      'EMAILADDRE' => 'urban_planner_email',
      'ORGANIZATI' => 'on_behalf_of',
      'WARD' => 'ward',
      'MUNICIPALITY' => 'municipality',
      'NAMEFIRST' => 'applicant_first_name',
      'NAMELAST' => 'applicant_last_name'
    }.freeze

    ASSOCIATIONS_TO_UPDATE = %w(statuses addresses contacts).freeze

    ATTRIBUTES_FOR_CREATE = %w(title build_type short_description description received_date).freeze
    ATTRIBUTES_FOR_UPDATE = %w(title build_type received_date).freeze

    DEFAULT_STATUS = 'Application Received'.freeze

    CITY = 'Guelph'.freeze
    PROVINCE = 'ON'.freeze
    COUNTRY = 'Canada'.freeze

    def initialize(csv_file)
      @lines = read_csv(csv_file).delete_if(&:empty?)
      headers = @lines.delete(@lines.first)
      @keys = headers.map { |key| DEV_SITE_KEY_MAP[key] }
      @keys[0] = 'address' # why in the everlasting fuck doesn't this map correctly
      @csv_entries = @lines.map do |values|
        obj = Hash[@keys.zip(values)]
        obj.delete_if { |key, _value| key.nil? }
      end
    end

    def sync
      @csv_entries.each do |entry_data|
        puts ''
        puts '-------------------------------------------------------------------------------'

        application_file = find_or_create_application_file(entry_data)
        next unless application_file

        result = update_existing_dev_site(application_file, entry_data) || create_new_dev_site(application_file, entry_data)

        if result[:errors]
          puts "Unable to sync dev site with devID #{result[:dev_site].devID}: #{result[:errors]}"
          next
        end

        result = update_dev_site_associations(result[:dev_site], entry_data)

        if result[:errors]
          puts "Unable to sync dev site with devID #{result[:dev_site].devID}: #{result[:errors]}"
        else
          puts "Finished syncing dev site with devID #{result[:dev_site].devID}"
        end

        puts '-------------------------------------------------------------------------------'
      end
    end

    def read_csv(csv_file)
      CSV.open(csv_file).readlines
    end

    def find_or_create_application_file(entry_data)
      file_number = entry_data['file_number']
      application_type = entry_data['application_type']

      application_file = ApplicationFile.find_by(file_number: file_number) ||
                         ApplicationFile.create(file_number: file_number, application_type: application_type)

      puts "Syncing data for application file with file number #{application_file.file_number}"
      application_file
    rescue
      puts "Unable to sync data for application file with file number #{application_file.file_number}: #{application_file.errors.full_messages}"
      return nil
    end

    def create_new_dev_site(application_file, entry_data)
      dev_site = DevSite.create(devID: entry_data['devID'])
      dev_site.application_files << application_file

      puts "Created new dev site with devID #{dev_site.devID} for application file #{application_file.file_number}"

      dev_site_attributes = entry_data.slice(*ATTRIBUTES_FOR_CREATE)

      guelph = Municipality.find_by(name: CITY)
      ward = Ward.find_or_create_by(name: entry_data['ward'])

      dev_site_attributes[:municipality_id] = guelph.id
      dev_site_attributes[:ward_id] = ward.id
      dev_site_attributes[:description] = entry_data['short_description']

      if dev_site.update_attributes(dev_site_attributes)
        return { dev_site: dev_site }
      end

      { dev_site: dev_site, errors: dev_site.errors.full_messages }
    end

    def update_existing_dev_site(application_file, entry_data)
      devID = entry_data['devID']
      existing_dev_site = application_file.dev_site

      unless existing_dev_site
        unless application_file.site_plan_type?
          existing_dev_site = DevSite.find_by(devID: devID)
        end
      end

      return false unless existing_dev_site

      puts "Updating dev site with devID #{existing_dev_site.devID}"

      existing_dev_site.application_files << application_file

      attributes_to_update = entry_data.slice(*ATTRIBUTES_FOR_UPDATE)

      if existing_dev_site.update_attributes(attributes_to_update)
        return { dev_site: existing_dev_site }
      end

      { dev_site: existing_dev_site, errors: existing_dev_site.errors.full_messages }
    end

    def update_dev_site_associations(dev_site, entry_data)
      ASSOCIATIONS_TO_UPDATE.each do |association|
        send("update_#{association}", dev_site, entry_data)
      end

      { dev_site: dev_site }

    rescue StandardError => error
      { dev_site: dev_site, errors: error }
    end

    def update_statuses(dev_site, entry_data)
      if dev_site.statuses.empty?
        dev_site.statuses << Status.create(status: DEFAULT_STATUS,
                                           start_date: entry_data['received_date'])
      end
    end

    def update_addresses(dev_site, entry_data)
      address = entry_data['address'].titleize
      existing_address = dev_site.addresses.where(street: address)
      primary_address = dev_site.addresses.where(primary_address: true)

      if existing_address.empty?
        dev_site.addresses << Address.create(street: address,
                                             city: CITY,
                                             province_state: PROVINCE,
                                             country: COUNTRY)
      end

      if primary_address.empty?
        dev_site.addresses.first.update(primary_address: true)
      end
    end

    def update_contacts(dev_site, entry_data)
      update_planner(dev_site, entry_data)
      update_applicant(dev_site, entry_data)
    end

    def update_planner(dev_site, entry_data)
      planner_email = entry_data['urban_planner_email']
      planner_name = entry_data['urban_planner_name']
      existing_planner = dev_site.contacts.where(contact_type: Contact::PLANNER,
                                                 email_address: planner_email,
                                                 first_name: planner_name)

      unless existing_planner
        dev_site.contacts << Contact.create(contact_type: Contact::PLANNER,
                                            email_address: planner_email,
                                            first_name: planner_name)
      end
    end

    def update_applicant(dev_site, entry_data)
      applicant_first_name = entry_data['applicant_first_name']
      applicant_last_name = entry_data['applicant_last_name']
      existing_applicant = dev_site.contacts.where(contact_type: Contact::APPLICANT,
                                                   first_name: applicant_first_name,
                                                   last_name: applicant_last_name)

      unless existing_applicant
        dev_site.contacts << Contact.create(contact_type: Contact::APPLICANT,
                                            first_name: applicant_first_name,
                                            last_name: applicant_last_name)
      end
    end
  end
end
