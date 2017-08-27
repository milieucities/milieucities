class CityUsers
  prepend SimpleCommand

  def initialize(user, expires_at)
    @user = user
    @expires_at = expires_at
  end

  def call
    payload = {
      user_id: @user.joins(:addresses).where(addresses: {primary_address: true})
    }

    JsonWebToken.encode(payload, @expires_at)
  end
end
