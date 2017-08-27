class SelectUsersForNotification
  prepend SimpleCommand

  AVAILABLE_SCOPES = %w(immediate_proximity ward municipality secondary_address).freeze

  def initialize(dev_site)
    @dev_site = dev_site
    @addresses = dev_site.addresses
  end

  def call
    # this should return an array or ActiveRecord assocation of users
    @addresses.collect do |address|
      next if address.lat.blank? || address.lon.blank?

      recipients = base_recipients

      AVAILABLE_SCOPES.each do |scope|
        method_name = "select_by_#{scope}"
        recipients = send(method_name, address, recipients)
      end

      recipients
    end.flatten
  end

  def base_recipients
    # get milieu user and planner user
    planner = User.find_by(email: @dev_site.urban_planner_email.try(:downcase))
    milieu = User.find_by(email: 'info@milieu.io')

    [milieu, planner].compact
  end

  def select_by_immediate_proximity(address, recipients)
    user_ids = Address.within(0.15, origin: [address.lat, address.lon])
                      .where(addressable_type: 'User')
                      .pluck(:addressable_id)

    recipients << User.find(user_ids.flatten).to_a

  rescue StandardError => e
    # this is how you catch and report errors with the SimpleCommand gem
    # check the docs for more info
    errors.add(:recipients, "Error selecting recipients by immediate proximity: #{e.class} - #{e.message}")
  end

  def select_by_ward(address, recipients)
    # This is where the real work is.
    # Not sure how we're going to detect wards
    # The geojson file is at app/client/components/DevSites/Index/Map/guelph_ward.geojson
  end

  def select_by_municipality(address, recipients)
    # this is just an example, check to see if it works! Might need some tweaking
    by_municipality = User.includes(:addresses, :notification_settings)
                          .where(notification_settings: { municipality_scope: true})
                          .where(addresses: { city: address.city, primary_address: true })
                          .to_a

    recipients << by_municipality

  rescue StandardError => e
    # this is how you catch and report errors with the SimpleCommand gem
    # check the docs for more info
    errors.add(:recipients, "Error selecting recipients by municipality: #{e.class} - #{e.message}")
  end

  def select_by_secondary_address(address, recipients)
    # probably you can reuse some of the logic from select_by_immediate_proximity
  end
end