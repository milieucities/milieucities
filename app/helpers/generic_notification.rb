class GenericNotification
  prepend SimpleCommand
  include ApplicationHelper

  class NotificationError < StandardError; end

  GLOBAL_MERGE_VARS = [:file_numbers, :application_types, :date_sent, :application_address, :dev_site_url]

  MERGE_VARS = [:recipient_name, :recipient_email]

  FROM_NAME = 'Milieu Cities on behalf of the City of Guelph'
  SUBJECT = 'Milieu Cities | New Status Update from City of Guelph, Ontario'

  def initialize(notification)
    @notification = notification
    @status = Status.find(notification.notifiable_id)
    @dev_site = @status.dev_site
    @global_merge_vars = GLOBAL_MERGE_VARS
  end

  def call
    recipients = find_recipients
    Rails.logger.info "RECIPIENTS COUNT => #{recipients.count}"

    return nil if recipients.empty?

    recipient_data = convert_users_to_mandrill_recipients(recipients)
    template = template_name
    global_merge_vars = generate_global_merge_vars
    merge_vars = convert_users_to_mandrill_merge_fields(recipients)
    send_at = @notification.send_at || DateTime.current

    message_object = {
      template_name: template,
      template_content: [],
      message: {
        to: recipient_data,
        global_merge_vars: global_merge_vars,
        merge_vars: merge_vars,
        merge: true,
        merge_language: 'handlebars',
        from_email: Notification::FROM_EMAIL,
        from_name: FROM_NAME,
        subject: SUBJECT
      },
      async: true,
      ip_pool: nil,
      send_at: send_at
    }

    Rails.logger.info "MESSAGE OBJECT => #{message_object}"
    message_object
  end

  protected

  def convert_users_to_mandrill_recipients(recipients)
    recipients.map do |user|
      { email: user.email }
    end
  end

  def convert_users_to_mandrill_merge_fields(recipients)
    recipients.map do |user|
      { rcpt: user.email, vars: [{ name: 'name', content: user.name }] }
    end
  end

  def find_recipients
    addresses = @dev_site.addresses
    user_ids = addresses.collect do |address|
      next if address.lat.blank? || address.lon.blank?
      user_ids = find_users_nearby(address)
    end

    planner = User.find_by(email: @dev_site.urban_planner_email.try(:downcase))
    milieu = User.find_by(email: 'info@milieu.io')

    recipients = User.find(user_ids.flatten)
    recipients << milieu if milieu.present?
    recipients << planner if planner.present?
    recipients
  end

  def find_users_nearby(address)
    Address
      .within(0.15, origin: [address.lat, address.lon])
      .where(addressable_type: 'User')
      .pluck(:addressable_id)
  end

  def template_name
    template = Notification::NOTIFICATION_TYPE_TO_TEMPLATE_MAP[@notification.notification_type]
    unless template
      raise NotificationError, "There is no template defined for the notification type #{@notification.notification_type}."
    end
    template
  end

  def generate_global_merge_vars
    @global_merge_vars.collect do |var|
      {
        name: var.to_s,
        content: self.send(var)
      }
    end
  end

  def file_numbers
    output = @dev_site.application_files.collect(&:file_number).to_sentence
    Rails.logger.info "FILE NUMBERS => #{output}"
    output
  end

  def date_sent
    format_date(@notification.send_at)
  end

  def application_types
    output = @dev_site.application_files.collect(&:application_type).to_sentence
    Rails.logger.info "APPLICATION TYPES => #{output}"
    output
  end

  def application_address
    @dev_site.address
  end

  def link_to_full_notice
    @dev_site.url_full_notice
  end

  def dev_site_url
    url = Services::UrlGenerator.generate_dev_site_url(@dev_site.id)
    Rails.logger.info "DEV SITE URL => #{url}"
    url
  end

  def recipient_name(user)
    user.name_from_profile
  end

  def recipient_email(user)
    user.email
  end

  def date_active
    active_status = @dev_site.statuses.find_by(status: Status::APPLICATION_COMPLETE_STATUS)
    return unless active_status

    format_date(active_status.start_date)
  end
end
