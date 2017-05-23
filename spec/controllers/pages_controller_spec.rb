require 'spec_helper'

describe PagesController do
  let(:dev_site) { create :dev_site }
  let(:valid_params) do
    {
      'name' => 'Sharon',
      'email' => 'sharon@mailinator.com',
      'message' => 'Hi Milieu!',
      'dev_site_id' => dev_site.id.to_s
    }
  end

  describe '#contact_councillor' do
    context 'with valid params' do
      it 'should send an email with the ContactMailer and return an empty response' do
        mock_mailer = double('contact form mailer')
        expect(ContactMailer)
          .to receive(:contact_councillor)
          .with(valid_params)
          .and_return(mock_mailer)
        expect(mock_mailer).to receive(:deliver_now)

        post :contact_councillor, valid_params

        expect(response.status).to eq(200)
        expect(response.body).to eq('{}')
      end
    end

    context 'with invalid params' do
      it 'should raise an error if dev site id is missing' do
        invalid_params = valid_params.except('dev_site_id')

        expect { post :contact_councillor, invalid_params }.to raise_error(ArgumentError)
      end
    end
  end

  describe '#contact_file_lead' do
    context 'with valid params' do
      it 'should send an email with the ContactMailer and return an empty response' do
        mock_mailer = double('contact form mailer')
        expect(ContactMailer)
          .to receive(:contact_file_lead)
          .with(valid_params)
          .and_return(mock_mailer)
        expect(mock_mailer).to receive(:deliver_now)

        post :contact_file_lead, valid_params

        expect(response.status).to eq(200)
        expect(response.body).to eq('{}')
      end
    end

    context 'with invalid params' do
      it 'should raise an error if dev site id is missing' do
        invalid_params = valid_params.except('dev_site_id')

        expect { post :contact_file_lead, invalid_params }.to raise_error(ArgumentError)
      end
    end
  end
end
