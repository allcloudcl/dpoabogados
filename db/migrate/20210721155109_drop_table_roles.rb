class DropTableRoles < ActiveRecord::Migration[6.1]
  def change
    drop_table :roles
  end
end
