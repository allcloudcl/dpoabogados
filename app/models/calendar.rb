class Calendar < ApplicationRecord
  COLORS = [
    '#9e5fff',
    '#00a9ff',
    '#ff5583',
    '#03bd9e',
    '#bbdc00',
    '#9d9d9d',
    '#ffbb3b',
    '#ff4040',
  ]

  belongs_to :user
  has_many :schedules

  after_initialize :set_color, unless: :persisted?

  private
  def set_color
    s = COLORS.sample
    self.bg_color = s
    self.drag_bg_color = s
    self.border_color = s
  end

  attribute :color, :string, default: "#ffffff"
end
