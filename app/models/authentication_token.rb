class AuthenticationToken < ActiveRecord::Base
  belongs_to :user
  validates :token, presence: true, uniqueness: true

  after_create :set_expires_at

  VALIDITY_PERIOD = 2.days

  def set_expires_at
    update(expires_at: created_at + VALIDITY_PERIOD)
  end
end
