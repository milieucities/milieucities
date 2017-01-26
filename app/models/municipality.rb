class Municipality < ActiveRecord::Base
  validates :name,
            presence: { message: 'Name is required.' },
            uniqueness: { message: 'Name must be unique.' }
end
