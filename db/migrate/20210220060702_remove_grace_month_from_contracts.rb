class RemoveGraceMonthFromContracts < ActiveRecord::Migration[6.1]
  def change
    remove_column :contracts, :grace_month, :boolean
  end
end
