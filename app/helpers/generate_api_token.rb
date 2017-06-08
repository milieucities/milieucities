class GenerateApiToken
  prepend SimpleCommand

  def call(user, expires_at)
    payload = {
      user_id: user.uuid,
      organization_id: organization.id,
    }

    JsonWebToken.encode(payload, expires_at)
  end
end
