require 'rails_helper'

module Services
  class GenerateNotificationForMandrill
    describe 'GenerateNotificationForMandrill' do
      context 'complete application notification' do
        let(:dev_site) { create :dev_site }
        let(:status) { create :status, dev_site_id: dev_site.id }
        let(:send_date) { DateTime.current }
        let(:notification_attributes) { attributes_for(:notification, notification_type: Notification::COMPLETE_APPLICATION, send_at: send_date)}

        it 'should call the correct service' do
          mock_result = double(result: true)
          expect(Services::Notifications::CompleteApplicationNotification).to receive(:call).and_return(mock_result)

          status.create_notification(notification_attributes)
        end
      end
    end
  end
end