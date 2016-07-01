class User < ActiveRecord::Base
  attr_accessor :remember_token

  # THIS ARRAY MUST BE IN ORDER BY EACH WARDS, WARD NUMBER
  VALID_NEIGHBOURHOOD_TYPES = [ "Orleans", "Innes", "Barrhaven", "Kanata North",
    "West Carleton-March", "Stittsville", "Bay", "College", "Knoxdale-Merivale",
    "Gloucester-Southgate", "Beacon Hill-Cyrville", "Rideau-Vanier", "Rideau-Rockcliffe",
    "Somerset", "Kitchissippi", "River", "Capital", "Alta Vista", "Cumberland", "Osgoode",
    "Rideau-Goulbourn", "Gloucester-South Nepean", "Kanata South"]

  VALID_ROLE_TYPES = ["Public", "City Official", "Organization", "Urban Developer"]

  before_create do |doc|
    doc.api_key = doc.generate_api_key
  end

  has_many :comments, as: :commentable

  validates               :email,
                            presence: {message: "Email is required"},
                            uniqueness: {message: "Email already in use"}
  validates               :username,
                            presence: {message: "Username is required"}
  has_secure_password
  validates               :password,
                            presence: {message: "Password is required", on: :create},
                            confirmation: {message: "Passwords do not match."},
                            length: { in: 6..20, message: "Password must be between 6 to 20 characters"}


  def full_name
    "#{self.first_name} #{self.last_name}"
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
    self.remember_token = User.new_token
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
