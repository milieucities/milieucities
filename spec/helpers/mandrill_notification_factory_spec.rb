require 'spec_helper'

describe MandrillNotificationFactory, type: :class do
  subject { MandrillNotificationFactory.new }
  before do
    create(:user, email: 'info@milieu.io')
    @dev_site = create(:dev_site)
    @status = create(:status, dev_site_id: @dev_site.id)
    @meeting = create(:meeting, status_id: @status.id)
  end

  describe '#generate' do
    context 'valid notification' do
      it 'should call the correct command and return the message object' do
        Notification::GUELPH_NOTIFICATION_TYPES.each do |notif_type|
          notification = create(:notification, notification_type: notif_type, notifiable_id: @status.id)
          result = subject.generate(notification)

          expect(result).to_not be_nil
        end
      end
    end

    context 'invalid notification' do
      it 'should raise an error' do
        notification = create(:notification, notifiable_id: @status.id)
        command_double = double('command', success?: false, errors: { notification: 'error' })
        allow(Notifications::StatusNotification).to receive(:call).and_return(command_double)

        expect { subject.generate(notification) }.to raise_error(MandrillNotificationFactory::NotificationFactoryError)
      end
    end
  end
end
