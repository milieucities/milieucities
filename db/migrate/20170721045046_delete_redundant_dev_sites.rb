class DeleteRedundantDevSites < ActiveRecord::Migration
  def change
    Rake::Task['create_application_files_and_destroy_redundant_dev_sites'].invoke
  end
end
