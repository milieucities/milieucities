class DevSiteSearch < ActiveRecord::Base
  self.primary_key = 'dev_site_id'
  SIMILARITY_THRESHOLD = 0.5

  FILTER_PARAMS = %w(organization municipality ward year status featured).freeze

  def initialize(search_params)
    @search_params = search_params.with_indifferent_access
    @search_results = DevSiteSearch.all
  end

  def results
    search_by_query
    search_by_location
    apply_filters

    dev_site_ids = @search_results.map(&:dev_site_id).uniq
    DevSite.includes(:statuses,
                     :comments,
                     :addresses,
                     :application_files,
                     :meetings,
                     :contacts)
           .where(id: dev_site_ids)
  end

  def search_by_query
    return unless @search_params['query']
    set_similarity_threshold
    @search_results = @search_results.fuzzy_search(@search_params['query'])
  end

  def search_by_location
    lat = @search_params['latitude']
    lon = @search_params['longitude']

    return unless lat && lon

    dev_site_ids = []
    dev_site_ids
      .push(Address.where(addressable_type: 'DevSite')
      .within(5, origin: [lat, lon])
      .closest(origin: [lat, lon])
      .limit(150)
      .pluck(:addressable_id))

    @search_results = @search_results.where(dev_site_id: dev_site_ids.flatten.uniq)
  end

  def apply_filters
    FILTER_PARAMS.each do |param|
      value = @search_params[param]
      next unless value

      @search_results = send("filter_by_#{param}", @search_results, value)
    end

    @search_results
  end

  def filter_by_year(collection, value)
    # in the view table we extract the year from a DateTime object and it returns a float
    collection.where(year: value.to_f)
  end

  def filter_by_municipality(collection, value)
    collection.where(municipality: value)
  end

  def filter_by_ward(collection, value)
    collection.where(ward: value)
  end

  def filter_by_status(collection, value)
    collection
      .where(status: value)
      .where('status_start <= ? AND (status_end IS NULL OR status_end > ?)',
             DateTime.current, DateTime.current)
  end

  def filter_by_featured(collection, value)
    collection.where(featured: value)
  end

  def filter_by_organization(collection, value)
    organization = Organization.find(value)
    municipalities = organization.municipalities.pluck(:name).uniq
    collection.where(municipality: municipalities)
  end

  def set_similarity_threshold
    ActiveRecord::Base.connection.execute("SELECT set_limit(#{SIMILARITY_THRESHOLD});")
  end
end
