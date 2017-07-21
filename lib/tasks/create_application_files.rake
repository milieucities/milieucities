desc "create application files for dev sites"
task create_application_files_and_destroy_redundant_dev_sites: :environment do |t, args|
  DevSite.includes(:application_types, :addresses).each do |property|
    begin
      property = property.reload
    rescue ActiveRecord::RecordNotFound
      puts "Property #{property.devID} has been deleted"
      next
    end
    primary_address = property.addresses.find_by(primary_address: true)
    dev_sites_at_this_address = DevSite.includes(:addresses).where(addresses: { street: primary_address.street })

    dev_sites_at_this_address.each do |dev_site|
      application_file = ApplicationFile.new(dev_site_id: property.id,
                                             application_type: dev_site.application_type_name,
                                             file_number: dev_site.devID)
      if application_file.save
        puts "Created #{application_file.application_type} application file for property #{property.devID}"
      else
        puts "Failed to create application file for DevSite #{property.devID}: #{application_file.errors.full_messages}"
      end
    end

    dev_sites_at_this_address.map do |site|
      next if site.application_type_name.downcase.include? 'site plan'
      next if site.devID == property.devID
      site.destroy
      puts "Deleted DevSite #{site.devID}"
    end
  end
end