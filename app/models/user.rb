class User < ActiveRecord::Base
  include BCrypt
  before_save :ensure_authentication_token

  # ASSOCIATIONS
  has_many :comments, as: :commentable

  # Rating
  ratyrate_rater

  # VALIDATIONS
  EMAIL_REGEX = %r{/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\z}i
  validates               :username, presence: {message: "User name is required"}
  validates_uniqueness_of :username,      on: :create
  validates               :first_name, presence: {message: "First name is required"}
  validates               :last_name, presence: {message: "Last name is required"}
  validates               :email,
                          presence: {message: "Email is required"},
                          :uniqueness => true,
                          :format => EMAIL_REGEX
  validates               :password, on: :create, presence: {message: "Password is required"}
  validates_length_of     :password, :in => 6..20, :on => :create
  validates               :bio, length: {maximum: 140, message: "140 characters max"}


  def full_name
    "#{self.first_name} #{self.last_name}"
  end


  def pword
    @pword ||= Password.new(password)
  end

  def pword=(new_password)
    @pword = Password.create(new_password)
    self.password = @pword
    self.password_confirmation = @pword
  end

end
