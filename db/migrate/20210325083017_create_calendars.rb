class CreateCalendars < ActiveRecord::Migration[6.1]
  def change
    create_table :calendars do |t|
      t.references :user, null: false, foreign_key: true
      t.string :color, default: "#000000"
      t.string :bg_color
      t.string :drag_bg_color
      t.string :border_color

      t.timestamps
    end
  end
end
