class Profile < ActiveRecord::Base
  belongs_to :user
  # THIS ARRAY MUST BE IN ORDER BY EACH WARDS, WARD NUMBER
  VALID_NEIGHBOURHOOD_TYPES = [ "Orleans", "Innes", "Barrhaven", "Kanata North",
    "West Carleton-March", "Stittsville", "Bay", "College", "Knoxdale-Merivale",
    "Gloucester-Southgate", "Beacon Hill-Cyrville", "Rideau-Vanier", "Rideau-Rockcliffe",
    "Somerset", "Kitchissippi", "River", "Capital", "Alta Vista", "Cumberland", "Osgoode",
    "Rideau-Goulbourn", "Gloucester-South Nepean", "Kanata South"]

  validates :name, presence: { message: "Name is required", on: :update }
  validates :organization, presence: true, if: :verification_requested?
  validates :community_role, presence: true, if: :verification_requested?
  validates :name, presence: true, if: :verification_requested?
  validates :bio, presence: true, if: :verification_requested?

  after_validation :send_verification_mailer, if: :verification_requested?, on: [:update]

  mount_uploader :avatar, ImagesUploader

  def verification_requested?
    verification_status == 'pendingVerification'
  end

  def send_verification_mailer
    VerificationMailer.request_role_verification(user).deliver_now
  end
end
