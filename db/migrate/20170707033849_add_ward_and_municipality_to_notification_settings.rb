class AddWardAndMunicipalityToNotificationSettings < ActiveRecord::Migration
  def change
    add_column :notification_settings, :ward_scope, :boolean
    add_column :notification_settings, :municipality_scope, :boolean
    add_column :notification_settings, :project_comments, :boolean
    add_column :notification_settings, :comment_replies, :boolean
    rename_column :notification_settings, :updated_dev_site_near_me, :immediate_vicinity_scope
    rename_column :notification_settings, :newletter, :newsletter
  end
end
