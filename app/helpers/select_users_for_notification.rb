class SelectUsersForNotification
  prepend SimpleCommand

  AVAILABLE_SCOPES = %w(immediate_proximity municipality secondary_address).freeze

  def initialize(dev_site)
    @dev_site = dev_site
    @addresses = dev_site.addresses
  end

  def call
    recipients = base_recipients

    users = @addresses.collect do |address|
      next if address.lat.blank? || address.lon.blank?

      AVAILABLE_SCOPES.each do |scope|
        method_name = "select_by_#{scope}"
        recipients << send(method_name, address)
      end

      recipients
    end

    users.flatten.compact.uniq
  end

  def base_recipients
    planners_emails = @dev_site.contacts.where(contact_type: Contact::PLANNER).pluck(:email_address).map(&:downcase)

    planners = User.find_by(email: planners_emails)
    milieu = User.find_by(email: ApplicationMailer::MILIEU_EMAIL_ADDRESS)

    [milieu, planners].flatten.compact
  end

  def user_ids_by_nearby_address(address, primary_address=true)
    user_ids = Address.within(0.15, origin: [address.lat, address.lon])
                      .where(addressable_type: 'User')
                      .where(primary_address: primary_address)
                      .pluck(:addressable_id)

    user_ids.flatten.uniq
  end

  def select_by_immediate_proximity(address)
    user_ids = user_ids_by_nearby_address(address)

    User.find(user_ids)

  rescue StandardError => e
    errors.add(:recipients, "Error selecting recipients by immediate proximity: #{e.class} - #{e.message}")
    nil
  end

  def select_by_ward(address)
    # This is where the real work is.
    # Not sure how we're going to detect wards
    # The geojson file is at app/client/components/DevSites/Index/Map/guelph_ward.geojson
  end

  def select_by_municipality(address)
    recipients_by_city = User.includes(:addresses, :notification_setting)
                             .where(addresses: { city: address.city, primary_address: true })
                             .where(notification_settings: { municipality_scope: true})
                             .to_a

    recipients_by_city

  rescue StandardError => e
    errors.add(:recipients, "Error selecting recipients by municipality: #{e.class} - #{e.message}")
    nil
  end

  def select_by_secondary_address(address)
    user_ids = user_ids_by_nearby_address(address, false)

    User.includes(:notification_setting)
        .where(id: user_ids)
        .where(notification_settings: { secondary_address: true })
        .to_a
  rescue StandardError => e
    errors.add(:recipients, "Error selecting recipients by secondary_address: #{e.class} - #{e.message}")
    nil
  end
end