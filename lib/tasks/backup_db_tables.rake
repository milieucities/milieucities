desc "Generate database dump just for DevSite table and associated tables."
task backup_devsite_data: :environment do
  db_name = Rails.configuration.database_configuration[Rails.env]['database']
  output_file = 'db/dev_sites_backup.sql'
  command = "pg_dump #{db_name} -O -t dev_sites -t application_files -t meetings -t notifications -t city_files -t statuses -t addresses -t comments -t wards -t municipalities -t sentiments > #{output_file}"
  puts "Dumping DevSites tables to #{output_file}"
  system(command)
end