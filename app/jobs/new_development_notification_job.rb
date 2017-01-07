require "mandrill"

class NewDevelopmentNotificationJob

  @queue = :primary_queue

  class << self

    def perform(dev_site_id)
      dev_site = DevSite.find(dev_site_id)
      addresses = dev_site.addresses

      addresses.each do |address|
        next if address.lat.blank? || address.lon.blank?
        user_ids = Address
                    .within(0.15, origin: [address.lat, address.lon])
                    .where(addressable_type: 'User')
                    .pluck(:addressable_id)

        next unless user_ids.size > 0

        recipients = convert_users_to_mandrill_recipients(user_ids)
        merge_vars = convert_users_to_mandrill_merge_fields(user_ids)
        body = ActionController::Base.new
                .render_to_string('user_mailer/new_development_notification.html.erb', layout: false)

        mandrill = Mandrill::API.new(ENV["MANDRILL_API_KEY"])

        message = {
          from_name: 'Milieu',
          from_email: 'info@milieu.io',
          to: recipients,
          subject: 'New develpment site built near you',
          html: body,
          merge_vars: merge_vars,
          preserve_recipients: false,
          global_merge_vars: [
            { name: 'address', content: address.full_address },
            { name: 'dev_site_url', content: "https://milieu.io/dev_sites/#{dev_site_id}" }
          ]
        }
        mandrill.messages.send message
      end
    end

    def convert_users_to_mandrill_recipients(user_ids)
      User.find(user_ids).map do |user|
        { email: user.email }
      end
    end

    def convert_users_to_mandrill_merge_fields(user_ids)
      User.find(user_ids).map do |user|
        { rcpt: user.email, vars: [{ name: 'name', content: user.name }] }
      end
    end

  end

end
