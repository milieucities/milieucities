class NewsletterSubscription < ActiveRecord::Base

  validates  :email, presence: { message: "Email is required" },
                     uniqueness: { message: "Email already in use" }

end
