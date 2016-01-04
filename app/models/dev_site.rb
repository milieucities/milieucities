class DevSite < ActiveRecord::Base
  # ASSOCIATIONS
  has_many :comments, as: :commentable
end
