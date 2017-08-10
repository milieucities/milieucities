require 'mandrill'
require 'json'

class SendNotificationJob
  @queue = :milieu_primary_queue

  class << self
    def perform(message_object)
      p "MANDRILL MESSAGE OBJECT => #{message_object}"
      send_email(message_object['template_name'],
                 message_object['template_content'],
                 message_object['message'],
                 message_object['async'],
                 message_object['ip_pool'],
                 message_object['send_at'])
    end

    private

    def send_email(template_name, template_content, message, async, ip_pool, send_at)
      p "SENDING MESSAGE TO MANDRILL"
      mandrill = Mandrill::API.new(ENV['MANDRILL_API_KEY'])
      result = mandrill.messages.send_template template_name, template_content, message, async, ip_pool, send_at
      p "RESULT FROM MANDRILL => #{result}"
    rescue Mandrill::Error => e
      puts "A mandrill error occurred: #{e.class} - #{e.message}"
      raise
    end
  end
end
