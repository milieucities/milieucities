json.array!(@dev_sites) do |dev_site|
  json.extract! dev_site, :id, :devID, :application_type, :title, :address, :lat, :long, :description, :ward_name, :ward_num
  json.url dev_site_url(dev_site, format: :json)
end
