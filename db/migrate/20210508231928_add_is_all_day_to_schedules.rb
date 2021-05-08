class AddIsAllDayToSchedules < ActiveRecord::Migration[6.1]
  def change
    add_column :schedules, :is_all_day, :boolean
  end
end
