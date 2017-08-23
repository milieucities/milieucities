class AddSecondaryAddressToNotificationSettings < ActiveRecord::Migration
  def change
    add_column :notification_settings, :secondary_address, :boolean, default: false
  end
end
