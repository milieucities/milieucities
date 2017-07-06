require 'mandrill'

class SendNotificationJob
  @queue = :milieu_primary_queue

  class << self
    def perform(message_object)
      send_email(message_object[:template_name],
                 message_object[:template_content],
                 message_object[:message],
                 message_object[:async],
                 message_object[:ip_pool],
                 message_object[:send_at])
    end

    private

    def send_email(template_name, template_content, message, async, ip_pool, send_at)
      mandrill = Mandrill::API.new(ENV['MANDRILL_API_KEY'])
      result = mandrill.messages.send message, async, ip_pool, send_at
      Rails.logger.info "RESULT FROM MANDRILL => #{result}"
    end
  end
end
