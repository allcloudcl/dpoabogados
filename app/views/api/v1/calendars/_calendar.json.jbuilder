json.extract! calendar, :id, :created_at, :updated_at
json.schedules calendar.schedules do |s|
    json.partial! 'api/v1/schedules/schedule', schedule: s
end
json.url api_v1_calendar_url(calendar, format: :json)
