class Schedule < ApplicationRecord
  belongs_to :calendar

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
