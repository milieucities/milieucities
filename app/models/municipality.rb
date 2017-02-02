class Municipality < ActiveRecord::Base
  has_many :wards, dependent: :destroy
  validates :name,
            presence: { message: 'Name is required.' },
            uniqueness: { message: 'Name must be unique.' }
end
