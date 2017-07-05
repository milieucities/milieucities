class CreateDevSitesNotifications < ActiveRecord::Migration
  def change
    create_table :dev_sites_notifications do |t|

      t.timestamps null: false
    end
  end
end
