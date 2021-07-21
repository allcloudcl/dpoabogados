class RemoveRoleFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :role_id, :string
  end
end
