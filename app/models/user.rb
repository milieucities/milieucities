class User < ActiveRecord::Base
  before_save :ensure_authentication_token

  # ASSOCIATIONS
  has_many :comments, as: :commentable
  acts_as_token_authenticatable

  # Rating
  ratyrate_rater

  def ensure_authentication_token
    if authentication_token.blank?
      self.authentication_token = generate_authentication_token
    end
  end



end
