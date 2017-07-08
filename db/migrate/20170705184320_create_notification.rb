class CreateNotification < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.datetime :send_at
      t.string :notification_type
      t.string :notice
      t.references :notifiable, polymorphic: true, index: true

      t.timestamps
    end

    remove_column :statuses, :notice, :string
    remove_column :statuses, :send_notification_at, :datetime
  end
end
