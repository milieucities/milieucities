class User < ActiveRecord::Base
  rolify
  has_secure_password validations: false

  has_one :profile, dependent: :destroy
  has_one :survey, dependent: :destroy
  accepts_nested_attributes_for :profile
  has_many :comments, as: :commentable
  has_many :likes, dependent: :destroy
  has_many :conversations, dependent: :destroy
  has_many :votes, dependent: :destroy

  after_create :create_survey

  validates :accepted_terms, acceptance: true
  validates  :email, presence: { message: "Email is required" },
  uniqueness: { message: "Email already in use" }, unless: "provider.present?"

  validates  :password, presence: {message: "Password is required", on: :create},
  confirmation: {message: "Passwords do not match."},
  length: { in: 6..20, message: "Password must be between 6 to 20 characters"}, unless: "provider.present?"

  delegate :name, to: :profile, allow_nil: true

end
