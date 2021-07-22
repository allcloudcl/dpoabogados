class CreateJoinTableAttendeesSchedules < ActiveRecord::Migration[6.1]
  def change
    create_join_table :attendees, :schedules do |t|
      t.index [:attendee_id, :schedule_id]
      # t.index [:schedule_id, :attende_id]
    end
  end
end
