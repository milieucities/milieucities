class NewDevelopmentJob
  @queue = :primary_queue

  def self.perform(dev_site_id)
    dev_site = DevSite.find(dev_site_id)
    addresses = dev_site.addresses

    addresses.each do |address|
      next if address.lat.blank? || address.lon.blank?
      user_ids = Address
                  .within(0.15, origin: [address.lat, address.lon])
                  .where(addressable_type: 'User')
                  .pluck(:addressable_id)
                  
      # SEND EMAIL TO ALL USERS
    end
  end
end
