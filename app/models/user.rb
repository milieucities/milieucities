class User < ActiveRecord::Base
  before_save :ensure_authentication_token

  # ASSOCIATIONS
  has_many :comments, as: :commentable
  acts_as_token_authenticatable

  # Rating
  ratyrate_rater

  # VALIDATIONS
  validates_presence_of   :username,      on: :create
  validates_uniqueness_of :username,      on: :create
  validates_presence_of   :email,         on: :create
  validates_uniqueness_of :email,         on: :create
  validates_presence_of   :password,      on: :create

  def ensure_authentication_token
    if authentication_token.blank?
      self.authentication_token = generate_authentication_token
    end
  end

  def password=(secret)
    write_attribute(:password, BCrypt::Password.create(secret))
  end


end
