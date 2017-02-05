module Services
  class UrlVerifier
    def self.verify_response(url, expected_code)
      response = HTTParty.get(url)
      response.code == expected_code
    end
  end
end