module Api
  module V1
    module Maps
      class OttawaMapController < ApplicationController
        layout "map"
        def map

        end

        def loadGeoJsonData
          require 'net/http'

          url = URI.parse('http://data.ottawa.ca/dataset/13deeed4-1cd5-4a68-a10d-9839d3677446/resource/39333199-c9b5-4dc8-bb59-0a9422c23f63/download/wards-2010-2.json')
          req = Net::HTTP::Get.new(url.to_s)
          res = Net::HTTP.start(url.host, url.port) {|http|
            http.request(req)
          }

          data = JSON.load(res.body)
          respond_to do |format|
            format.json {
                          render :json => data
                        }
          end
        end
      end
    end
  end
end
