class RejectConsultantsJob
  @queue = :primary_queue

  def self.perform(dev_site_id)
    # Engagement.find(engagements_ids).each(&:notify_rejection)
  end
end
