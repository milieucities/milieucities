require "#{Rails.root}/app/services/dev_site_data_migration.rb"

desc "Create application files for dev sites, delete redundant dev sites, and set primary address"
task migrate_data_to_new_model: :environment do |t, args|
  DevSite.includes(:addresses).each do |dev_site|
    begin
      dev_site = dev_site.reload
    rescue ActiveRecord::RecordNotFound
      puts "Dev Site #{dev_site.devID} has been deleted"
      next
    end

    service = Services::DevSiteDataMigration.new(dev_site)
    service.perform
  end
end
