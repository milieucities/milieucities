require 'spec_helper'

describe ContactMailer do
  let(:dev_site) do
    create(:dev_site,
           urban_planner_email: 'urbanplanner@mailinator.com',
           ward_councillor_email: 'councilloremail@mailinator.com')
  end

  let(:message) do
    {
      'name' => 'Sharon',
      'email' => 'sharon@mailinator.com',
      'message' => 'Hi Milieu!',
      'dev_site_id' => dev_site.id.to_s
    }
  end

  describe '#contact_file_lead' do
    it 'should generate an email to the file lead' do
      mail = ContactMailer.contact_file_lead(message)

      expect(mail.to).to eq([dev_site.urban_planner_email])
      expect(mail.from).to eq([ContactMailer::MILIEU_EMAIL_ADDRESS])
      expect(mail.subject).to eq('Message for File Lead from Milieu.io')
      expect(mail.respond_to?(:deliver_now)).to be true
    end
  end

  describe '#contact_councillor' do
    it 'should generate an email to the ward councillor' do
      mail = ContactMailer.contact_councillor(message)

      expect(mail.to).to eq([dev_site.ward_councillor_email])
      expect(mail.from).to eq([ContactMailer::MILIEU_EMAIL_ADDRESS])
      expect(mail.subject).to eq('Message for Councillor from Milieu.io')
      expect(mail.respond_to?(:deliver_now)).to be true
    end
  end
end
