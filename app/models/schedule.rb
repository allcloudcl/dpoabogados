class Schedule < ApplicationRecord
  belongs_to :calendar
  has_and_belongs_to_many :attendees, class_name: "User", association_foreign_key: :attendee_id, join_table: "attendees_schedules"
  # has_and_belongs_to_many :attendees, class_name: "User", foreign_key: :schedule_id, association_foreign_key: :attendee_id, join_table: "attendees_schedules"

  enum category: [:time, :milestone, :task, :allday], _default: :time

  before_create :set_color

  private
  def set_color
    c = calendar.bg_color
    self.bg_color = c
    self.drag_bg_color = c
    self.border_color = c
  end

  attribute :color, :string, default: "#ffffff"
end
