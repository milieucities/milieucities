class GenerateApiToken
  prepend SimpleCommand

  def initialize(user, organization, expires_at)
    @user = user
    @organization = organization
    @expires_at = expires_at
  end

  def call
    payload = {
      user_id: @user.id,
      organization_id: @organization.id
    }

    JsonWebToken.encode(payload, @expires_at)
  end
end
