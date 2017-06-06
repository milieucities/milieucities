class CreateDevSitesApplicationTypesJoinTable < ActiveRecord::Migration
  def change
    create_table :application_types_dev_sites, id: false do |t|
      t.belongs_to :application_type, index: true
      t.belongs_to :dev_site, index: true
    end
  end
end
