class CreateSchedules < ActiveRecord::Migration[6.1]
  def change
    create_table :schedules do |t|
      t.references :calendar, null: false, foreign_key: true
      t.string :title, null: false
      t.string :body, null: false
      t.datetime :start, null: false
      t.datetime :end, null: false
      t.integer :category, null: false, default: 0
      t.string :location
      t.boolean :read_only, default: false
      t.string :color, default: "#000000"
      t.string :bg_color
      t.string :drag_bg_color

      t.timestamps
    end
  end
end
