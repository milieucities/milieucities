class MigrateApplicationTypeDataForDevSites < ActiveRecord::Migration
  def change
    DevSite.all.each do |dev_site|
      app_type = ApplicationType.find_by(name: dev_site.application_type)

      next unless app_type

      dev_site.application_types << app_type
    endr
  end
end
