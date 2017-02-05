require "#{Rails.root}/app/services/remove_dead_links_from_dev_site.rb"

desc 'Sync dev sites from ottwatch.ca'
task sync_devsites: :environment do
  sync_service = Services::DevSiteSync.new
  sync_service.sync
end
