class DevSite < ActiveRecord::Base
  # ASSOCIATIONS
  has_many :comments, as: :commentable
  has_many :addresses
  has_many :statuses

  # Rating
  ratyrate_rateable "location", "app_type"
end
