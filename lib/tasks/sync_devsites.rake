require "#{Rails.root}/app/services/dev_site_scraper.rb"

desc 'Sync dev sites from ottwatch.ca'
task :sync_devsites => :environment do
  sync_service = Services::DevSiteScraper.new
  sync_service.scrape
end
