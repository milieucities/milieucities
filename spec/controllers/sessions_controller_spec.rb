require 'spec_helper'
include SessionsHelper

describe SessionsController do
  describe "POST #create" do

    before(:each) do
      @user = FactoryGirl.create(:user, first_name: "John", last_name: "Smith", username: "jsmith")
     end

     context "when credentials are correct" do

       before(:each) do
        credentials = { email: @user.email, password: @user.password, password_confirmation: @user.password_confirmation }
        post :create, { session: credentials, locale: :en }
      end

      it "returns the user record corresponding to the given credentials" do
        expect(!session[:user_id].nil?).to be_truthy
        expect(response).to redirect_to(root_path)
      end

     end

     context "when credentials are not missing" do
       before(:each) do
        credentials = { email: "", password: "", password_confirmation: "" }
        post :create, { session: credentials, locale: :en }
      end

      it "returns the user record corresponding to the given credentials" do
        expect(!session[:user_id].nil?).to be_falsy
        expect(response).to redirect_to(new_session_path)
      end

     end

  end

  describe "DELETE #destroy" do
    before(:each) do
      @user = FactoryGirl.create(:user, first_name: "John", last_name: "Smith", username: "jsmith")
      login(@user)
      delete :destroy, { id: @user.id, locale: :en }
    end

    it "returns to home page after a successful logout" do
      delete :destroy, { id: @user.id, locale: :en }
      expect(response).to redirect_to(root_path)
      expect(session[:user_id].nil?).to be_truthy
    end

  end
end
