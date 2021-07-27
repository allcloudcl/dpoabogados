json.extract! schedule, :id, :title, :body, :start, :end, :category, :location, :created_at, :updated_at
json.calendarId schedule.calendar_id
json.isReadOnly schedule.read_only
json.color schedule.color
json.bgColor schedule.bg_color
json.dragBgColor schedule.drag_bg_color
json.borderColor schedule.border_color
json.attendees schedule.attendees do |attendee|
  json.extract! attendee, :id, :dni, :first_name, :last_name, :full_name
end

json.url api_v1_schedule_url(schedule, format: :json)
