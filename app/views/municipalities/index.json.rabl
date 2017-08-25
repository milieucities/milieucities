collection @municipalities

attributes :id, :name

child :wards do
  attributes :id, :name
end

node :statuses do |mun|
  DevSite.where(municipality_id: mun.id).map(&:status).uniq
end
