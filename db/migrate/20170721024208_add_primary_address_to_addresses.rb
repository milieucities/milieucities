class AddPrimaryAddressToAddresses < ActiveRecord::Migration
  def up
    add_column :addresses, :primary_address, :boolean, default: false

    DevSite.includes(:addresses).each do |dev_site|
      next if dev_site.addresses.empty?
      dev_site.addresses.first.update_attributes(primary_address: true)
      puts "Set primary address for DevSite #{dev_site.devID}"
    end
  end

  def down
    remove_column :addresses, :primary_address, :boolean
  end
end
