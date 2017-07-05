class RenameNotificationsToNotificationSettings < ActiveRecord::Migration
  def change
    rename_table :notifications, :notification_settings
  end
end
