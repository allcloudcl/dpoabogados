class AddRoleToUsers < ActiveRecord::Migration[6.1]
  def change
    add_reference :users, :role, null: false, default: 1, foreign_key: true
  end
end
