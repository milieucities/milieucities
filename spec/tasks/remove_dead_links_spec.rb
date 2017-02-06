require 'spec_helper'
require 'rake'

describe 'prune dead links tasks' do
  let(:dev_site1) { create(:dev_site, updated_at: DateTime.current - 8.days) }
  let(:dev_site2) { create(:dev_site, updated_at: DateTime.current - 2.days) }

  before :all do
    Rake.application.rake_require 'tasks/remove_dead_links'
    Rake::Task.define_task(:environment)
  end

  describe 'prune_all_city_file_links' do
    it 'should call PruneDeadLinksJob on each dev site' do
      expect(Resque).to receive(:enqueue).with(PruneDeadLinksJob, dev_site1.id)
      expect(Resque).to receive(:enqueue).with(PruneDeadLinksJob, dev_site2.id)

      Rake::Task['prune_all_city_file_links'].reenable
      Rake::Task['prune_all_city_file_links'].invoke
    end
  end

  describe 'prune_stale_city_file_links task' do
    it 'should call PruneDeadLinksJobo only on dev sites not recently updated' do
      expect(Resque).to receive(:enqueue).with(PruneDeadLinksJob, dev_site1.id)

      Rake::Task['prune_stale_city_file_links'].reenable
      Rake::Task['prune_stale_city_file_links'].invoke
    end
  end
end
