class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :first_name
      t.string :last_name
      t.string :email_address
      t.string :on_behalf_of
      t.string :contact_type
      t.references :dev_site
      t.timestamps null: false
    end
  end
end
