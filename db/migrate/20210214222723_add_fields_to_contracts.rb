class AddFieldsToContracts < ActiveRecord::Migration[6.1]
  def change
    add_column :contracts, :creditor, :string, null: false
    add_column :contracts, :amount, :decimal, null: false
    add_column :contracts, :dues, :integer, null: false
    add_column :contracts, :grace_month, :boolean, default: false
    add_column :contracts, :payment, :decimal, null: false
    add_column :contracts, :value_fee, :decimal, null: false
    add_column :contracts, :payday, :date, null: false
  end
end
