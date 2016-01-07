class DevSite < ActiveRecord::Base
  # ASSOCIATIONS
  has_many :comments, as: :commentable

  # Rating
  ratyrate_rateable "location", "app_type"
end
