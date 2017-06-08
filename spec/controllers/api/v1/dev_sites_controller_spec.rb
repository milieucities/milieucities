require 'spec_helper'

describe Api::V1::DevSitesController do
  let(:json_data) do
    filepath = Rails.root.join 'spec', 'fixtures', 'dev_site_sync_data.json'
    JSON.parse(File.read(filepath))
  end

  describe '#sync' do
    context 'with valid token' do
      it 'should update or create dev sites from json' do
        pre_count = DevSite.count
        p "pre-count #{pre_count}"

        post :sync, json_data, format: :json



        post_count = DevSite.count
        p "post_count = #{post_count}"
        expect(response.status).to eq(200)
        expect(pre_count < post_count).to be true
      end
    end

    context 'with invalid token' do
      it 'should return a 403 status' do
        # pending
      end
    end
  end
end
