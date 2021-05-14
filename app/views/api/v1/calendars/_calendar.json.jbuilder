json.extract! calendar, :id, :user_id, :created_at, :updated_at
json.name calendar.user.full_name
json.color calendar.color
json.bgColor calendar.bg_color
json.dragBgColor calendar.drag_bg_color
json.borderColor calendar.border_color
json.url api_v1_calendar_url(calendar, format: :json)
