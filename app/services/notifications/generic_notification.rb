module Services
  module Notifications
    class GenericNotification
      prepend SimpleCommand

      class NotificationError < StandardError; end

      GLOBAL_MERGE_VARS = [:file_number, :date_sent, :application_type, :application_address, :link_to_full_notice]

      MERGE_VARS = [:recipient_name, :recipient_email]

      FROM_EMAIL = 'notifications@milieu.io'
      FROM_NAME = 'Milieu Cities on behalf of the City of Guelph'
      SUBJECT = 'Milieu Cities | New Status Update from City of Guelph, Ontario'

      def initialize(notification)
        @notification = notification
        @dev_site = notification.status.dev_site
      end

      def call
        recipients = find_recipients

        return nil if recipients.empty?

        recipient_data = convert_users_to_mandrill_recipients(recipients)
        template = template_name
        global_merge_vars = generate_global_merge_vars
        merge_vars = generate_merge_vars

        {
          recipient_data: recipient_data,
          template_name: template_name,
          global_merge_vars: global_merge_vars,
          merge_vars: merge_vars,
          from_email: FROM_EMAIL,
          from_name: FROM_NAME,
          subject: SUBJECT
        }
      end

      protected

      def convert_users_to_mandrill_recipients(recipients)
        recipients.map do |user|
          { email: user.email }
        end
      end

      def convert_users_to_mandrill_merge_fields(users)
        User.find(user_ids).map do |user|
          { rcpt: user.email, vars: [{ name: 'name', content: user.name }] }
        end
      end

      def find_recipients
        addresses = @dev_site.addresses
        user_ids = addresses.collect do |address|
          next if address.lat.blank? || address.lon.blank?
          user_ids = find_users_nearby(address)
        end
        User.find(user_ids.flatten)
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
      end

      def generate_global_merge_vars
        GLOBAL_MERGE_VARS.collect do |var|
          {
            name: var.to_s,
            content: self.send(var)
          }
        end
      end

      def file_number
        @dev_site.devID
      end

      def date_sent
        @notification.send_at
      end

      def application_type
        @dev_site.application_type_name
      end

      def application_address
        @dev_site.address
      end

      def link_to_full_notice
        @dev_site.url_full_notice
      end

      def recipient_name(user)
        user.name_from_profile
      end

      def recipient_email(user)
        user.email
      end
    end
  end
end