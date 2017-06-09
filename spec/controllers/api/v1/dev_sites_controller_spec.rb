require 'spec_helper'
require 'pry'

describe Api::V1::DevSitesController do
  let(:json_data) do
    filepath = Rails.root.join 'spec', 'fixtures', 'dev_site_sync_data.json'
    JSON.parse(File.read(filepath))
  end

  let(:organization) { create(:organization) }
  let(:user) { create(:user) }

  describe '#sync' do
    context 'with valid token' do
      before do
        user.organizations << organization
        @token = GenerateApiToken.call(user, organization, DateTime.current + 1.day).result
        create(:ward, name: 'Ward 1')
        create(:municipality, name: 'Guelph')
      end

      before :each do
      end

      it 'should create dev sites from valid json and return results object' do
        pre_count = DevSite.count

        request.env['HTTP_AUTHORIZATION'] = @token

        post :sync, json_data, format: :json

        post_count = DevSite.count

        expect(response.status).to eq(200)
        expect(pre_count < post_count).to be true
        expect(JSON.parse(response.body)['results']).to_not be_nil
      end

      it 'should return an error object if json is invalid' do
        request.env['HTTP_AUTHORIZATION'] = @token

        post :sync, {}, format: :json

        expect(response.status).to eq(422)
        expect(JSON.parse(response.body)['errors']).to_not be_nil
      end
    end

    context 'with invalid token' do
      it 'should return a 401 status' do
        request.env['HTTP_AUTHORIZATION'] = 'invalid'

        post :sync, json_data, format: :json

        expect(response.status).to eq(401)
      end
    end
  end
end

