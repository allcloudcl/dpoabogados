json.array! @contracts do |contract|
  json.extract! contract, :id, :description, :created_at, :updated_at, :creditor, :amount, :dues, :grace_months, :payment, :value_fee, :payday
  json.path api_v1_contract_path(contract)
  json.kind contract.kind.try { titleize }
  json.user do
      json.id contract.user.id
      json.dni contract.user.dni
      json.full_name contract.user.full_name
      json.email contract.user.email
      json.phone contract.user.phone
  end
end
