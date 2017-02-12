class PruneDeadLinksJob
  @queue = :milieu_primary_queue

  def self.perform(dev_site_id)
    dev_site = DevSite.find_by(id: dev_site_id)
    dev_site.city_files.each(&:destroy_if_dead_link) if dev_site.present?
  end
end
