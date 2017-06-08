require "#{Rails.root}/app/services/dev_site_sync_csv.rb"

desc 'Sync dev sites from Guelph CSV format'
task sync_devsites_from_csv: :environment do
  csv_file = Rails.root.join('lib', 'fixtures', 'guelph_sample.csv')
  service = Services::DevSiteSyncCsv.new(csv_file)
  service.sync
end
