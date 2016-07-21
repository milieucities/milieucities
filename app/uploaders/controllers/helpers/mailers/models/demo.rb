class Demo < ActiveRecord::Base
  validates :email, uniqueness: true
end
