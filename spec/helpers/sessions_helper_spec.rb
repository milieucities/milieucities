require 'spec_helper'

describe SessionsHelper do
  before(:each) do
    @user = FactoryGirl.create(:user, first_name: "John", last_name: "Smith", username: "jsmith")
   end

   context "sessions helper" do

     it "creates a session using user credentials" do
       login(@user)
       expect(session[:user_id]).to eq @user.id
     end

     it "creates a cookie using user credentials" do
       remember(@user)
       expect(cookies.signed['user_id']).to eq @user.id
       expect(cookies['remember_token']).to eq @user.remember_token
     end

    it "returns right user when session is nil (equal to current_user )" do
      remember(@user)
      expect(@user).to eq current_user
      expect(!session[:user_id].nil?).to be_truthy
    end

    it "returns nil for current_user when remember digest is wrong" do
      remember(@user)
      @user.update_attribute(:remember_digest, User.digest(User.new_token))
      expect(current_user).to be_nil
    end

   end
end
