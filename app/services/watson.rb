module Services
  module Watson
    BASE_URI = 'https://gateway-a.watsonplatform.net/calls/text'.freeze
    SENTIMENT_PATH = '/TextGetEmotion'.freeze

    def sentiment_analysis(text)
      params = { outputMode: 'json', text: text }.to_param
      uri = URI("#{BASE_URI}#{SENTIMENT_PATH}?apikey=#{ENV['WATSON_ALCHEMY_KEY']}&#{params}")

      req = Net::HTTP::Post.new(uri)
      req['Accept-Encoding'] = 'deflate'

      res = Net::HTTP.start(uri.host, uri.port, use_ssl: true) do |http|
        http.request(req)
      end

      JSON.parse(res.body)['docEmotions']
    end
  end
end
