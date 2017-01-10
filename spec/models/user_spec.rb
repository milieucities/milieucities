require 'spec_helper'

describe User do
  let(:user) { build_stubbed(:user) }

  subject { user }

  it { should respond_to(:email) }
  it { should respond_to(:password) }
  it { should respond_to(:password_confirmation) }
  it { should be_valid }

  describe 'when email is not present' do
    before { user.email = '' }
    it { should_not be_valid }
  end

  describe 'when passwords do not match' do
    before { user.password = '1', user.password_confirmation = '2' }
    it { should_not be_valid }
  end
end
