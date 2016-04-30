class User < ActiveRecord::Base
  has_secure_password

  VALID_NEIGHBOURHOOD_TYPES = [ "Orleans", "Innes", "Barrhaven", "Kanata North",
    "West Carleton-March", "Stittsville", "Bay", "College", "Rideau-Rockcliffe",
    "Somerset", "Kitchissippi", "River", "Capital", "Alta Vista", "Cumberland", "Osgoode",
    "Rideau-Goulbourn", "Gloucester-South Nepean", "Kanata South", "Knoxdale-Merivale",
    "Gloucester-Southgate", "Beacon Hill-Cyrville", "Rideau-Vanier"]

  VALID_ROLE_TYPES = ["Public", "City Official", "Organization", "Urban Developer"]

  before_create do |doc|
    doc.api_key = doc.generate_api_key
  end

  # ASSOCIATIONS
  has_many :comments, as: :commentable

  # Rating
  ratyrate_rater

  # VALIDATIONS
  validates               :username, presence: { message: "User name is required"}
  validates_uniqueness_of :username, on: :create
  # validates               :first_name, presence: {message: "First name is required"}
  # validates               :last_name, presence: {message: "Last name is required"}
  validates               :email,
                          presence: {message: "Email is required"},
                          :uniqueness => true
  validates               :password, on: :create, presence: {message: "Password is required"}
  validates_length_of     :password, :in => 6..20, :on => :create
  # validates               :bio, length: {maximum: 140, message: "140 characters max"}
  validates               :role, presence: { message: "A user role is required" }


  def full_name
    "#{self.first_name} #{self.last_name}"
  end

  def generate_api_key
    loop do
      token = SecureRandom.base64.tr('+/=', 'Qrt')
      break token unless User.exists?(api_key: token)
    end
  end


end
