class CreateApplicationFiles < ActiveRecord::Migration
  def change
    create_table :application_files do |t|
      t.references :dev_site
      t.string :file_number, null: false
      t.string :application_type, null: false

      t.timestamps null: false
    end
  end
end
