# save OTTAWA database settings in global var
DB_OTTAWA = YAML::load(ERB.new(File.read(Rails.root.join("config/db_cities","database_ottawa.yml"))).result)[Rails.env]
