require 'spec_helper'

describe SessionsHelper do
  before(:each) do
    @user = FactoryGirl.create(:user, first_name: "John", last_name: "Smith", username: "jsmith")
   end
end
