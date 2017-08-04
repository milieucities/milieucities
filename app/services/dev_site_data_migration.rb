module Services
  class DevSiteDataMigration
    def initialize(dev_site)
      @primary_address = dev_site.addresses.first
      @dev_sites_at_this_address = DevSite.includes(:addresses)
                                          .where(addresses: { street: @primary_address.street })

      @site_plan_dev_sites = @dev_sites_at_this_address.select do |site|
        ApplicationFile::SITE_PLAN_APPLICATION_TYPES.include? site.application_type_name
      end

      @remaining_dev_sites = @dev_sites_at_this_address.reject do |site|
        @site_plan_dev_sites.include? site
      end

      @reference_dev_site = @remaining_dev_sites.first

      @dev_sites_to_delete = @remaining_dev_sites.reject { |site| site == @reference_dev_site }
    end

    def perform
      puts ''
      puts "==================================================================="
      puts "Migrating data for the dev sites at #{@primary_address.street}"

      puts "Dev sites at this address:"
      @dev_sites_at_this_address.each do |site|
        puts "#{site.inspect}"
      end

      @site_plan_dev_sites.each do |site_plan_dev_site|
        update_dev_site_primary_address(site_plan_dev_site)
        create_application_file(site_plan_dev_site)
        create_contacts(site_plan_dev_site)
      end

      if @reference_dev_site
        @remaining_dev_sites.each do |dev_site|
          application_file = create_application_file(dev_site)
          @reference_dev_site.application_files << application_file if application_file
        end

        update_dev_site_primary_address(@reference_dev_site)
        create_contacts(@reference_dev_site)
      end


      unless @dev_sites_to_delete.empty?
        @dev_sites_to_delete.map do |dev_site|
          puts "Deleting dev site #{dev_site.devID}"
          dev_site.destroy
        end
      end

      puts "Finished migrating data for dev sites at #{@primary_address.street}"
      puts "-------------------------------------------------------------------"
      puts ''
      puts ''
    end

    def update_dev_site_primary_address(dev_site)
      dev_site.addresses.first.update(primary_address: true)
      puts "Set primary address for DevSite #{dev_site.devID}"
    end

    def create_application_file(dev_site)
      application_file = ApplicationFile.new(dev_site_id: dev_site.id,
                                             application_type: dev_site.application_type_name,
                                             file_number: dev_site.devID)
      if application_file.save
        puts "Created #{application_file.application_type} application file for dev site #{dev_site.devID}"
        application_file
      else
        puts "Failed to create application file for DevSite #{dev_site.devID}: #{application_file.errors.full_messages}"
        nil
      end
    end

    def create_contacts(dev_site)
      puts "Creating contacts for dev site #{dev_site.devID}"
      dev_site.contacts << Contact.create(contact_type: Contact::WARD_COUNCILLOR,
                                          email_address: dev_site.ward_councillor_email)
      dev_site.contacts << Contact.create(contact_type: Contact::PLANNER,
                                          email_address: dev_site.urban_planner_email,
                                          first_name: dev_site.urban_planner_name)
      dev_site.contacts << Contact.create(contact_type: Contact::APPLICANT,
                                          first_name: dev_site.applicant_first_name,
                                          last_name: dev_site.applicant_last_name,
                                          on_behalf_of: dev_site.on_behalf_of)
    end
  end
end
