module Notifications
  class GenericNotification
    prepend SimpleCommand
    include ApplicationHelper

    class NotificationError < StandardError; end

    DEFAULT_MERGE_VARS = [
      :file_numbers,
      :application_types,
      :date_sent,
      :application_address,
      :notice_url,
      :dev_site_url
    ]

    FROM_NAME = 'Milieu Cities on behalf of the City of Guelph'.freeze
    SUBJECT = 'Milieu Cities | New Status Update from City of Guelph, Ontario'.freeze
    MERGE_LANG = 'handlebars'.freeze

    def initialize(notification)
      @notification = notification
      @status = Status.find(notification.notifiable_id)
      @dev_site = @status.dev_site
      @global_merge_vars = DEFAULT_MERGE_VARS
    end

    def call
      recipients = select_recipients

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
          merge_language: MERGE_LANG,
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

    rescue StandardError => e
      errors.add(:notification, "#{e}")
      nil
    end

    protected

    def convert_users_to_mandrill_recipients(recipients)
      recipients.map do |user|
        { email: user.email }
      end
    end

    def convert_users_to_mandrill_merge_fields(recipients)
      recipients.map do |user|
        { rcpt: user.email, vars: [{ name: 'name', content: user.name_from_profile }] }
      end
    end

    def select_recipients
      command = SelectUsersForNotification.new(@dev_site).call

      return command.result if command.success?

      errors.add(:notification, "Unable to select recipients: #{command.errors[:recipients]}")
      return nil
    end

    def template_name
      template = Notification::NOTIFICATION_TYPE_TO_TEMPLATE_MAP[@notification.notification_type]
      unless template
        raise StandardError, "There is no template defined for the notification type #{@notification.notification_type}."
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
      @dev_site.application_files.collect(&:file_number).to_sentence
    end

    def date_sent
      format_date(@notification.send_at)
    end

    def application_types
      @dev_site.application_files.collect(&:application_type).to_sentence
    end

    def application_address
      @dev_site.address
    end

    def notice_url
      return @notification.notice.url if @notification.notice.present?
      @dev_site.url_full_notice
    end

    def dev_site_url
      Services::UrlGenerator.generate_dev_site_url(@dev_site.id)
    end
  end
end