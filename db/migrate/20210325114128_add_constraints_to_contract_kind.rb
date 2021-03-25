class AddConstraintsToContractKind < ActiveRecord::Migration[6.1]
  def change
    change_column_null :contracts, :kind, false, 0
    change_column_default :contracts, :kind, from: nil, to: 0
  end
end
