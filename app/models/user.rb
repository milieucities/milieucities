class User < ActiveRecord::Base
  rolify
  has_secure_password validations: false

  has_one :profile, dependent: :destroy
  accepts_nested_attributes_for :profile
  has_many :comments, as: :commentable

  validates :accepted_terms, acceptance: true
  validates  :email, presence: {message: "Email is required"},
  uniqueness: {message: "Email already in use"}

  validates  :password, presence: {message: "Password is required", on: :create},
  confirmation: {message: "Passwords do not match."},
  length: { in: 6..20, message: "Password must be between 6 to 20 characters"}

end
