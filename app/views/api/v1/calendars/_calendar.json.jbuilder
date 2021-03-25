json.extract! calendar, :id, :created_at, :updated_at
json.schedules calendar.schedules do |s|
    json.extract! s, :id, :title, :body, :start, :end, :category, :location
    json.isReadOnly s.read_only
    json.color s.color
    json.bgColor s.bg_color
    json.dragBgColor s.drag_bg_color
end
json.url api_v1_calendar_url(calendar, format: :json)
