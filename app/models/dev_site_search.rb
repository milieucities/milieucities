class DevSiteSearch < ActiveRecord::Base
  self.primary_key = "dev_site_id"

  FILTER_PARAMS = %w(municipality ward status year featured).freeze

  def initialize(search_params)
    @search_params = search_params
    @search_results = DevSiteSearch.all
  end

  def results
    search_by_query
    search_by_location

    dev_site_ids = @search_results.map(&:dev_site_id).uniq
    dev_sites = DevSite.joins(:ward, :municipality).includes(:statuses, :comments, :addresses).where(id: dev_site_ids)

    apply_filters(dev_sites)
  end

  def search_by_query
    return unless @search_params['query']
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

  def apply_filters(collection)
    FILTER_PARAMS.each do |param|
      value = @search_params[param]
      return collection unless value

      collection = send("filter_by_#{param}", collection, value)
    end

    collection
  end

  def filter_by_year(collection, value)
    collection.where('extract(year from updated) = ?', value)
  end

  def filter_by_municipality(collection, value)
    Rails.logger.info("filtering by municipality => #{value}")
    collection.where(municipalities: { name: value })
  end

  def filter_by_ward(collection, value)
    collection.where(wards: { name: value })
  end

  def filter_by_status(collection, value)
    collection
      .where("statuses.start_date = (select max(statuses.start_date) \
               from statuses where statuses.dev_site_id = dev_sites.id)")
      .where(statuses: { status: value })
  end

  def filter_by_featured(collection, value)
    collection.where(featured: value)
  end
end