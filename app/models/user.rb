class User < ActiveRecord::Base
  rolify
  has_secure_password validations: false
  attr_accessor :remember_token

  has_one :profile, dependent: :destroy
  accepts_nested_attributes_for :profile
  has_many :comments, as: :commentable

  validates :accepted_terms, acceptance: true
  validates  :email, presence: {message: "Email is required"},
  uniqueness: {message: "Email already in use"}

  validates  :password, presence: {message: "Password is required", on: :create},
  confirmation: {message: "Passwords do not match."},
  length: { in: 6..20, message: "Password must be between 6 to 20 characters"}

  before_create do |doc|
    doc.api_key = doc.generate_api_key
  end

  def generate_api_key
    loop do
      token = SecureRandom.base64.tr('+/=', 'Qrt')
      break token unless User.exists?(api_key: token)
    end
  end

  def self.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
    BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  def self.new_token
    SecureRandom.urlsafe_base64
  end

  def remember
    remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(remember_token))
  end

  # Forgets a user.
  def forget
    update_attribute(:remember_digest, nil)
  end

  # Returns true if the given token matches the digest.
  def authenticated?(remember_token)
    return false if remember_digest.nil?
    BCrypt::Password.new(remember_digest).is_password?(remember_token)
  end

end
