class Municipality < ActiveRecord::Base
  has_many :wards, dependent: :destroy
  has_many :dev_sites
  has_many :statuses
  has_and_belongs_to_many :organizations

  validates :name,
            presence: { message: 'Name is required.' },
            uniqueness: { message: 'Name must be unique.' }

  def valid_statuses
    no_accents = I18n.transliterate(name)
    constant = no_accents.upcase.split(' ').join('_')
    status_set = "#{constant}_STATUSES"
    Status.const_get(status_set)

  rescue NameError
    Status::DEFAULT_STATUSES
  end
end
