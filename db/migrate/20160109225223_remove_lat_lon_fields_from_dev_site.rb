class RemoveLatLonFieldsFromDevSite < ActiveRecord::Migration
  def change
    remove_column :dev_sites, :lat, :float
    remove_column :dev_sites, :lon, :float
  end
end
