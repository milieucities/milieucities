class DevSiteSearchViewTableV1 < ActiveRecord::Migration
  def up
    execute <<-SQL
      CREATE VIEW dev_site_searches AS

      SELECT
        dev_sites.id AS dev_site_id,
        dev_sites.title,
        dev_sites.short_description,
        dev_sites.description,
        dev_sites.featured,
        addresses.street,
        addresses.city,
        application_files.application_type,
        application_files.file_number,
        municipalities.name AS municipality,
        wards.name AS ward,
        statuses.status,
        statuses.start_date AS status_start,
        statuses.end_date AS status_end,
        (extract(year from dev_sites.updated)) AS year
      FROM dev_sites
      LEFT JOIN addresses ON dev_sites.id = addresses.addressable_id AND addresses.addressable_type = 'DevSite'
      JOIN application_files ON dev_sites.id = application_files.dev_site_id
      JOIN municipalities ON dev_sites.municipality_id = municipalities.id
      JOIN wards ON dev_sites.ward_id = wards.id
      JOIN statuses ON dev_sites.id = statuses.dev_site_id;

      CREATE INDEX index_dev_sites_on_title ON dev_sites USING gin(to_tsvector('english', title));
      CREATE INDEX index_dev_sites_on_short_description ON dev_sites USING gin(to_tsvector('english', short_description));
      CREATE INDEX index_dev_sites_on_description ON dev_sites USING gin(to_tsvector('english', description));
      CREATE INDEX index_addresses_on_street ON addresses USING gin(to_tsvector('english', street));
      CREATE INDEX index_addresses_on_city ON addresses USING gin(to_tsvector('english', city));
      CREATE INDEX index_application_files_on_application_type ON application_files USING gin(to_tsvector('english', application_type));
      CREATE INDEX index_application_files_on_file_number ON application_files USING gin(to_tsvector('english', file_number));
      CREATE INDEX index_municipalities_on_name ON municipalities USING gin(to_tsvector('english', name));
      CREATE INDEX index_wards_on_name ON wards USING gin(to_tsvector('english', name));
      CREATE INDEX index_statuses_on_status ON statuses USING gin(to_tsvector('english', status));
    SQL
  end

  def down
    execute <<-SQL
      DROP VIEW dev_site_searches;
      DROP INDEX index_dev_sites_on_title;
      DROP INDEX index_dev_sites_on_short_description;
      DROP INDEX index_dev_sites_on_description;
      DROP INDEX index_addresses_on_street;
      DROP INDEX index_addresses_on_city;
      DROP INDEX index_application_files_on_application_type;
      DROP INDEX index_application_files_on_file_number;
      DROP INDEX index_municipalities_on_name;
      DROP INDEX index_wards_on_name;
      DROP INDEX index_statuses_on_status;
    SQL
  end
end
