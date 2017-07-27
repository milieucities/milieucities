require "#{Rails.root}/app/services/dev_site_sync_csv.rb"

desc "Sync dev sites from Guelph CSV format. Usage: rake sync_devsites_from_csv['filename.csv']"
task :sync_devsites_from_csv, [:filename] => [:environment] do |t, args|
  csv_file = Rails.root.join('lib', 'fixtures', args[:filename])
  p "Syncing DevSites from #{args[:filename]}"
  service = Services::DevSiteSyncCsv.new(csv_file)
  service.sync
end