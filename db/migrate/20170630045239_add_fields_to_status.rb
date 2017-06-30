class AddFieldsToStatus < ActiveRecord::Migration
  def change
    add_column :statuses, :notice, :string
    add_column :statuses, :send_notification_at, :datetime
  end
end
