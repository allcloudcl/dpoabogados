class AddFieldsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :dni, :string, null: false
    add_index :users, :dni, unique: true
    add_column :users, :address, :string
  end
end
