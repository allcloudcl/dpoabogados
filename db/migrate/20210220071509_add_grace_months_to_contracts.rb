class AddGraceMonthsToContracts < ActiveRecord::Migration[6.1]
  def change
    add_column :contracts, :grace_months, :integer, default: 0
  end
end
