desc "Create application files for dev sites, delete redundant dev sites, and set primary address"
task migrate_data_to_new_model: :environment do |t, args|
  DevSite.includes(:addresses).each do |dev_site|
    begin
      dev_site = dev_site.reload
    rescue ActiveRecord::RecordNotFound
      puts "Dev Site #{dev_site.devID} has been deleted"
      next
    end

    dev_sites_at_this_address = DevSite.includes(:addresses).where(addresses: { street: primary_address.street })

    site_plan_dev_sites = dev_sites_at_this_address.select do |site|
      ['Site Plan Approval', 'Site Plan Control'].include? site.application_type_name
    end

    site_plan_dev_sites.each do |site_plan|
      set_primary_address(site_plan)
      create_application_file(site_plan)
      create_contacts(site_plan)
    end

    # get all dev sites with this address
    # find site plan at this address
    # create application file and associate it with the site plan dev site
    # set primary address for dev site
    # create contacts
    # remove site plan devsite from collection
    # select the first of the remaining dev sites
    # for each of the remaining dev sites, create an application file and associate it to the selected dev site
    # delete the rest of the non-selected dev sites
    # set primary address for dev site
    # create contacts for dev site
    # remove redundant columns in dev site database



    primary_address = dev_site.addresses.find_by(primary_address: true)
    dev_sites_at_this_address = DevSite.includes(:addresses).where(addresses: { street: primary_address.street })

    dev_sites_at_this_address.each do |dev_site|
      application_file = ApplicationFile.new(dev_site_id: dev_site.id,
                                             application_type: dev_site.application_type_name,
                                             file_number: dev_site.devID)
      if application_file.save
        puts "Created #{application_file.application_type} application file for dev_site #{dev_site.devID}"
      else
        puts "Failed to create application file for DevSite #{dev_site.devID}: #{application_file.errors.full_messages}"
      end
    end

    dev_sites_at_this_address.map do |site|
      next if site.application_type_name.downcase.include? 'site plan'
      next if site.devID == dev_site.devID
      site.destroy
      puts "Deleted DevSite #{site.devID}"
    end

  end
end

def set_dev_site_primary_address(dev_site)
  dev_site.addresses.first.update(primary_address: true)
  puts "Set primary address for DevSite #{dev_site.devID}"
end

def create_application_file(dev_site)
  application_file = ApplicationFile.new(dev_site_id: dev_site.id,
                                         application_type: dev_site.application_type_name,
                                         file_number: dev_site.devID)
  if application_file.save
    puts "Created #{application_file.application_type} application file for dev_site #{dev_site.devID}"
  else
    puts "Failed to create application file for DevSite #{dev_site.devID}: #{application_file.errors.full_messages}"
  end
end

def create_contacts(dev_site)
  # ward councillor
  # planner
  # applicant
end
