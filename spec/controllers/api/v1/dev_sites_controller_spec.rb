describe Api::V1::DevSitesController do
  let(:json_data) do
    filepath = Rails.root.join 'spec', 'fixtures', 'dev_site_sync_data.json'
    JSON.parse(File.read(filepath))
  end

  let(:organization) { create(:organization) }
  let(:user) { create(:user) }

  describe '#sync' do
    context 'with valid token' do
      it 'should update or create dev sites from json' do
        user.organizations << organization

        token = GenerateApiToken.call(user, organization, DateTime.current + 1.day)
        pre_count = DevSite.count

        request.env['HTTP_AUTHORIZATION'] = token.result

        post :sync, json_data, format: :json

        post_count = DevSite.count

        expect(response.status).to eq(200)
        expect(pre_count < post_count).to be true
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
