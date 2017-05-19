require 'spec_helper'

describe AuthenticationToken do
  let(:user) { create :user }

  it 'should set expires_at after creation' do
    token = user.generate_auth_token

    expect(token.expires_at).to_not be_nil
    expect(token.expires_at).to eq(token.created_at + AuthenticationToken::VALIDITY_PERIOD)
  end
end
