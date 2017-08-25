class DevSiteSearchViewTableV1 < ActiveRecord::Migration
  def up
    execute <<-SQL
      CREATE VIEW dev_site_searches AS

      SELECT
        dev_sites.id AS dev_site_id,
        dev_sites.title,
        dev_sites.short_description,
        dev_sites.description,
        addresses.street,
        addresses.city,
        application_files.application_type,
        application_files.file_number
      FROM dev_sites
      JOIN addresses ON dev_sites.id = addresses.addressable_id AND addresses.addressable_type = 'DevSite'
      JOIN municipalities ON dev_sites.municipality_id = municipalities.id
      JOIN wards ON dev_sites.ward_id = wards.id
      JOIN application_files ON dev_sites.id = application_files.dev_site_id
      JOIN statuses ON dev_sites.id = statuses.dev_site_id
      JOIN comments ON dev_sites.id = comments.commentable_id AND comments.commentable_type = 'DevSite';

      CREATE INDEX index_dev_sites_on_title ON dev_sites USING gin(to_tsvector('english', title));
      CREATE INDEX index_dev_sites_on_short_description ON dev_sites USING gin(to_tsvector('english', short_description));
      CREATE INDEX index_dev_sites_on_description ON dev_sites USING gin(to_tsvector('english', description));
      CREATE INDEX index_addresses_on_street ON addresses USING gin(to_tsvector('english', street));
      CREATE INDEX index_addresses_on_city ON addresses USING gin(to_tsvector('english', city));
      CREATE INDEX index_application_files_on_application_type ON application_files USING gin(to_tsvector('english', application_type));
      CREATE INDEX index_application_files_on_file_number ON application_files USING gin(to_tsvector('english', file_number));
    SQL
  end

  def down
    execute "DROP VIEW dev_site_searches"
  end
end
