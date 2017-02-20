require 'spec_helper'
require 'mandrill'

describe NewDevelopmentNotificationJob do
  describe '#perform' do
    let(:address_attributes) { attributes_for :address }
    let(:dev_site) { create :dev_site }
    let(:user) { create :user }
    let(:expected_body) do
      template = 'user_mailer/new_development_notification.html.erb'
      ActionController::Base.new.render_to_string(template, layout: false)
    end

    context 'user lives within 150m of new dev site' do
      before :each do
        user.create_address(address_attributes)
        dev_site.addresses << create(:address, address_attributes)

        @expected_message_object = {
          from_name: 'Milieu',
          from_email: 'info@milieu.io',
          to: [email: user.email],
          subject: 'New develpment site built near you',
          html: expected_body,
          merge_vars: [{ rcpt: user.email, vars: [{ name: 'name', content: user.name }] }],
          preserve_recipients: false,
          global_merge_vars: [
            { name: 'address', content: user.address.full_address },
            { name: 'dev_site_url', content: "https://milieu.io/dev_sites/#{dev_site.id}" }
          ]
        }
      end

      it 'should send the user a notification' do
        mock_mandrill = double('mandrill api')
        expect(Mandrill::API).to receive(:new).and_return(mock_mandrill)
        expect(mock_mandrill).to receive(:messages).and_return(mock_mandrill)
        expect(mock_mandrill).to receive(:send).with(@expected_message_object)

        NewDevelopmentNotificationJob.perform(dev_site.id)
      end
    end

    context 'user lives further than 150m of new dev site' do
      before :each do
        dev_site.addresses << create(:address, address_attributes)
        address_attributes[:lat] = 49.418032
        user.create_address(address_attributes)
      end

      it 'should not send the user a notification' do
        expect(Mandrill::API).to_not receive(:new)

        NewDevelopmentNotificationJob.perform(dev_site.id)
      end
    end
  end
end
