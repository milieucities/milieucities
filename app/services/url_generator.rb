module Services
  class UrlGenerator
    HOST_MAP = {
      'development' => 'localhost:3000',
      'test' => 'localhost:3000',
      'production' => 'cities.milieu.io',
      'staging' => 'test.milieu.io'
    }.freeze

    def self.generate_approve_comment_url(opts)
      host = HOST_MAP[Rails.env]
      root_url = Rails.application.routes.url_helpers.dev_site_comment_approve_url(dev_site_id: opts[:dev_site_id], comment_id: opts[:comment_id], host: host)
      query = {
        email: opts[:email],
        token: opts[:token],
        comment: {
          flagged_as_offensive: Comment::APPROVED_STATUS
        }
      }.to_query

      "#{root_url}?#{query}"
    end

    def self.generate_reject_comment_url(opts)
      host = HOST_MAP[Rails.env]
      root_url = Rails.application.routes.url_helpers.dev_site_comment_reject_url(dev_site_id: opts[:dev_site_id], comment_id: opts[:comment_id], host: host)

      query = {
        email: opts[:email],
        token: opts[:token]
      }.to_query

      "#{root_url}?#{query}"
    end

    def self.generate_dev_site_url(dev_site_id)
      host = HOST_MAP[Rails.env]
      Rails.application.routes.url_helpers.dev_site_url(id: dev_site_id, host: host)
    end
  end
end
