require 'spec_helper'
include SessionsHelper

describe StaticPagesController do
  describe "POST /contact_milieu" do
    it "should deliver the contact email" do

      message_delivery = instance_double(ActionMailer::MessageDelivery)

      message = { name: "Jimmy Bean", email: "email@example.com", message: "message" }
      # expect
      expect(ContactMailer).to(receive(:contact_milieu).with(message)).and_return(message_delivery)
      expect(message_delivery).to receive(:deliver_now)
      # when
      post :contact_milieu, { locale: 'en', contact_milieu: message }
    end
  end

  describe "POST /contact_councillor" do
    it "should deliver the contact concillor email" do

      message_delivery = instance_double(ActionMailer::MessageDelivery)

      message = { name: "Jimmy Bean", email: "email@example.com", message: "message", dev_site_id: "321412" }
      # expect
      expect(ContactMailer).to(receive(:contact_councillor).with(message)).and_return(message_delivery)
      expect(message_delivery).to receive(:deliver_now)
      # when
      post :contact_councillor, { locale: 'en', contact_councillor: message }
    end
  end

  describe "POST /contact_file_lead" do
    it "should deliver the contact concillor email" do

      message_delivery = instance_double(ActionMailer::MessageDelivery)

      message = { name: "Jimmy Bean", email: "email@example.com", message: "message", dev_site_id: "321412" }
      # expect
      expect(ContactMailer).to(receive(:contact_file_lead).with(message)).and_return(message_delivery)
      expect(message_delivery).to receive(:deliver_now)
      # when
      post :contact_file_lead, { locale: 'en', contact_file_lead: message }
    end
  end
end
