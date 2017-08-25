require 'data_analysis'

class DevSite < ActiveRecord::Base
  include Services::DataAnalysis

  scope :latest, -> { joins(:statuses).order('statuses.start_date DESC') }

  mount_uploaders :images, ImagesUploader
  mount_uploaders :files, FilesUploader

  VALID_BUILDING_TYPES = [
    'Not Applicable',
    'Derelict',
    'Demolition',
    'Residential Apartment',
    'Low-rise Residential',
    'Mid-rise Residential',
    'Hi-rise Residential',
    'Mixed-use Residential/Community',
    'Commercial',
    'Commercial/Hotel',
    'Mixed-use',
    'Additions'
  ].freeze

  VALID_FILTERS = %w(year municipality ward status featured).freeze

  belongs_to :municipality, foreign_key: 'municipality_id'
  belongs_to :ward
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :addresses, as: :addressable, dependent: :destroy
  has_one  :sentiment, as: :sentimentable, dependent: :destroy
  has_many :statuses, dependent: :destroy
  has_many :city_files, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :meetings, dependent: :destroy
  has_many :application_files, dependent: :destroy
  has_many :contacts, dependent: :destroy
  has_and_belongs_to_many :application_types

  accepts_nested_attributes_for :addresses, allow_destroy: true
  accepts_nested_attributes_for :likes, allow_destroy: true

  validates :title, presence: { message: 'Title is required' }
  validates :description, presence: { message: 'Description is required' }
  validates :municipality_id, presence: { message: 'Municipality is required' }
  validates :ward_id, presence: { message: 'Ward is required' }

  after_create do
    Resque.enqueue(NewDevelopmentNotificationJob, id) unless Rails.env.test?
  end

  after_save do
    Resque.enqueue(PruneDeadLinksJob, id) unless Rails.env.test?
  end

  def general_status
    return if statuses.empty?
    statuses.current.general_status
  end

  def status
    return if statuses.empty?
    statuses.current.status
  end

  def status_date
    return if statuses.empty?
    return nil unless statuses.current.start_date
    statuses.current.start_date.strftime('%B %e, %Y')
  end

  def valid_statuses
    return Status::DEFAULT_STATUSES unless municipality

    city_name = municipality.name
    no_accents = I18n.transliterate(city_name)
    city_constant = no_accents.upcase.split(' ').join('_')
    status_set = "#{city_constant}_STATUSES"
    Status.const_get(status_set)

  rescue NameError
    Status::DEFAULT_STATUSES
  end

  def street
    return if addresses.empty?
    primary_address.street
  end

  def primary_address
    addresses.find_by(primary_address: true)
  end

  def address
    return if addresses.empty?
    primary_address.full_address(with_country: false)
  end

  def latitude
    return if addresses.empty?
    primary_address.lat
  end

  def longitude
    return if addresses.empty?
    primary_address.lon
  end

  def ward_name
    ward.name if ward.present?
  end

  def image_url
    return images.first.web.url if images.present?
    return streetview_image unless addresses.empty?
    ActionController::Base.helpers.image_path('mainbg.jpg')
  end

  def contact_email(contact_type)
    return if contacts.empty?
    contact = contacts.find_by(contact_type: contact_type)
    contact.email_address if contact
  end

  def update_sentiment
    return unless comments.present?

    results = overall_sentiments(comments.includes(:sentiment))

    create_sentiment if sentiment.blank?

    update(add_total_suffix(results[:totals]))
    sentiment.update(results[:averages])
  end

  def application_files_by_type
    application_files.map(&:application_type)
  end

  def application_type_name
    application_types.first.name if application_types.any?
  end

  private

  def add_total_suffix(totals)
    new_totals = {}
    totals.map do |key, value|
      new_key = "#{key}_total".to_sym
      new_totals[new_key] = value
    end
    new_totals
  end

  def streetview_image
    root_url = 'https://maps.googleapis.com/maps/api/streetview'
    image_size = '600x600'
    api_key = 'AIzaSyAwocEz4rtf47zDkpOvmYTM0gmFT9USPAw'

    "#{root_url}?size=#{image_size}&location=#{address}&key=#{api_key}"
  end
end
