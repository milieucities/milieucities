class AddActiveAtToDevSites < ActiveRecord::Migration
  def change
    add_column :dev_sites, :active_at, :datetime
    add_column :dev_sites, :applicant, :string
    add_column :dev_sites, :urban_planner_name, :string
  end
end
