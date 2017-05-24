module Services
  class UrlGenerator
    HOST_MAP = {
      'development' => 'http://localhost:3000',
      'test' => 'http://localhost:3000',
      'production' => 'https://cities.milieu.io',
      'staging' => 'http://test.milieu.io'
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
  end
end
