class RemoveFilenameFromEntries < ActiveRecord::Migration[6.1]
  def change
    remove_column :entries, :filename, :string
  end
end
