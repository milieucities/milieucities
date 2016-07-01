require 'spec_helper'

describe User do
  before { @user = FactoryGirl.build(:user, first_name: "John", last_name: "Smith", username: "jsmith") }

  subject { @user }

  it { should respond_to(:email) }
  it { should respond_to(:password) }
  it { should respond_to(:password_confirmation) }
  it { should respond_to{:username} }
  it { should respond_to{:first_name} }
  it { should respond_to{:last_name} }

  it { should be_valid }

  describe "when email is not present" do
    before { @user.email = "" }
    it { should_not be_valid }
  end

  describe "when passwords do not match" do
    before { @user.password = "1", @user.password_confirmation = "2" }
    it { should_not be_valid }
  end

  describe "authenticated test" do
    it "should be false when there is no value entered" do
      expect(@user.authenticated?('')).to be_falsy
    end

  end

end
