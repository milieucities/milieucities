json.array!(@events) do |event|
  json.extract! event, :id, :title, :description, :time
  json.url event_url(event, format: :json)
end
