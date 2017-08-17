require 'spec_helper'

describe Notification do
  describe '#send_notification' do
    context 'invalid notification' do
      it 'should not save notifications with missing attributes' do
        required_attrs = [:send_at, :notification_type]

        required_attrs.each do |attr|
          notification_attrs = attributes_for(:notification).except(attr)

          notification = Notification.new(notification_attrs)

          expect(notification.valid?).to be false
        end
      end

      it 'should not save notification if notification type is invalid' do
        notification_attrs = attributes_for(:notification)
        notification_attrs[:notification_type] = 'invalid type'

        notification = Notification.new(notification_attrs)

        expect(notification.valid?).to be false
      end
    end

    context 'valid notification' do
      it 'should generate a notification object and enqueue the SendNotificationJob' do
        notification = build(:notification)
        notification_factory_dbl = instance_double('GenerateNotificationForMandrill')
        expected_message_object = { test: 'test' }
        expect(GenerateNotificationForMandrill).to receive(:new).and_return(notification_factory_dbl)
        expect(notification_factory_dbl).to receive(:generate).and_return(expected_message_object)
        expect(Resque).to receive(:enqueue).with(SendNotificationJob, expected_message_object)

        notification.save
      end
    end
  end
end
