class AddStatusIdToMeeting < ActiveRecord::Migration
  def change
    add_column :meetings, :status_id, :integer
  end
end
