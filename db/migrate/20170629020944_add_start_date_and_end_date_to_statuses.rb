class AddStartDateAndEndDateToStatuses < ActiveRecord::Migration
  def change
    rename_column :statuses, :status_date, :start_date
    add_column :statuses, :end_date, :datetime
  end
end
