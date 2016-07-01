require 'spec_helper'
include SessionsHelper

describe DevSitesController do
  describe "GET #index" do
    before(:each) do
      @user = FactoryGirl.create(:user, first_name: "John", last_name: "Smith", username: "jsmith")
      login @user
      4.times { FactoryGirl.create :dev_site }
     end

      context "when a user is logged in" do
        it "returns a list of dev sites" do
          get :index, locale: :en
          expect(response).to be_success
          expect(response).to have_http_status(200)
        end
      end
  end

  describe "GET #edit" do
    before(:each) do
      @user = FactoryGirl.create(:user, first_name: "John", last_name: "Smith", username: "jsmith")
      @factory = FactoryGirl.create :dev_site
     end
     context "when a user is logged in" do
       it "returns the edit page" do
         login @user
         get :edit, { id: @factory.id, locale: :en }
         expect(response).to be_success
         expect(response).to have_http_status(200)
       end
     end
    context "when a user is not logged in" do
      it "returns redirect to root" do
        get :edit, { id: @factory.id, locale: :en }
        expect(response).to redirect_to(root_path)
      end
    end
  end

  describe "GET #new" do
    before(:each) do
      @user = FactoryGirl.create(:user, first_name: "John", last_name: "Smith", username: "jsmith")
     end
     context "when a user is logged in" do
       it "returns the edit page" do
         login @user
         get :new, { locale: :en }
         expect(response).to be_success
         expect(response).to have_http_status(200)
       end
     end
    context "when a user is not logged in" do
      it "returns redirect to root" do
        get :new, { locale: :en }
        expect(response).to redirect_to(root_path)
      end
    end
  end

  # describe "POST #create" do
  # end
  #
  # describe "DELETE #destroy" do
  # end
end
