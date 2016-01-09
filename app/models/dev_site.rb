class DevSite < ActiveRecord::Base
  # ASSOCIATIONS
  has_many :comments, as: :commentable
  has_many :addresses, dependent: :destroy
  has_many :statuses, dependent: :destroy

  # Rating
  ratyrate_rateable "location", "app_type"
end
