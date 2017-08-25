collection @municipalities

attributes :id, :name

child :wards do
  attributes :id, :name
end

node :statuses do |mun|
  mun.valid_statuses
end
