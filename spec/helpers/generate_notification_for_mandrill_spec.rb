require 'spec_helper'

describe GenerateNotificationForMandrill, type: :class do
  before do
    dev_site = create(:dev_site)
    status = create(:status, dev_site_id: dev_site.id)
  end

  describe '#generate' do
    context 'valid notification type' do

    end

    context 'invalid notification type' do

    end

    context ''
  end

  context 'with one valid dev site' do
    it 'should return results object with dev site in success array' do
      context = UpdateDevSiteFromJson.call([valid_dev_site_json])

      expect(context).to be_success
      expect(context.result[:success].count).to eq(1)
    end
  end
end
