require 'spec_helper'

describe DevSite do
  before { @dev_site = FactoryGirl.build(:dev_site) }

  subject { @dev_site }

  it { should respond_to(:devID) }
  it { should respond_to(:application_type) }
  it { should respond_to(:description) }
  it { should respond_to(:ward_name) }
  it { should respond_to(:ward_num) }

  it { should respond_to(:comments) }
  it { should respond_to(:addresses) }
  it { should respond_to(:statuses) }
  it { should respond_to(:city_files) }

  it { should respond_to(:files) }
  it { should respond_to(:images) }

  it { should be_valid }
end
