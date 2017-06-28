class AddShortDescriptionToDevsite < ActiveRecord::Migration
  def change
    add_column :dev_sites, :short_description, :string
  end
end
