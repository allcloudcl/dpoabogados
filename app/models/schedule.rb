class Schedule < ApplicationRecord
  belongs_to :calendar

  enum category: [:time, :milestone, :task, :allday], _default: :time
end
