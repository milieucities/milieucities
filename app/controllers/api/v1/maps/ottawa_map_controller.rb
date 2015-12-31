module Api
  module V1
    module Maps
      class OttawaMapController < ApplicationController
        layout "map"

        def map

        end

        def loadGeoJsonData
          path = Rails.root + 'app/controllers/api/v1/maps/wards2010.json'
          file = File.read(path)
          wards = JSON.load(file)
          respond_to do |format|
            format.json {
                          render :json => wards
                        }
          end
        end

        def loadMarkers
          base_uri = 'https://dazzling-fire-3693.firebaseio.com/'
          secret_key = '1Ako5Lh4vYRAicdW5obV0JOyGRcZiF8SvFw8bxtm'

          firebase = Firebase::Client.new(base_uri, secret_key)

          response = firebase.get('-K5ScwrOXhsYB58_rB13/')
          # puts response.body[1]
          data_json = response.body[1]
          latLon = {
            'lat': data_json['allInfo']['lat'],
            'lon': data_json['allInfo']['lon']
          }
          respond_to do |format|
            format.json { render :json => response.body }
          end
        end

      end
    end
  end
end
