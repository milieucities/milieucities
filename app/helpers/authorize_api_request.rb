class AuthorizeApiRequest
  prepend SimpleCommand

  def initialize(headers = {})
    @headers = headers
    @decoded_token = decoded_auth_token
  end

  def call
    user
  end

  private

  attr_reader :headers, :decoded_token

  def user
    return unless decoded_token
    @user ||= User.find_by(uuid: decoded_token[:user_id])
    @user ||= User.find_by(id: decoded_token[:user_id])

    valid_organization? if @user.present? && decoded_token[:organization_id]

    return errors.add(:token, 'User does not belong to organization') unless valid_organization?

    @user || errors.add(:token, 'Invalid token')
  end

  def decoded_auth_token
    JsonWebToken.decode(http_auth_header)
  end

  def http_auth_header
    return headers['Authorization'].split(' ').last if headers['Authorization'].present?

    errors.add(:token, 'Missing token')
    nil
  end

  def valid_organization?
    @user.organizations.find_by(id: decoded_token[:organization_id]).present?
  end
end
