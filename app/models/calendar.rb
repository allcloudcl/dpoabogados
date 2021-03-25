class Calendar < ApplicationRecord
  belongs_to :user
  has_many :schedules
end
