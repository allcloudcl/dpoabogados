json.extract! contract, :id, :description, :created_at, :updated_at, :creditor, :amount, :dues, :grace_month, :payment, :value_fee, :payday
json.path api_v1_contract_path(contract)
json.kind contract.kind.try { titleize }
json.user do
    json.id contract.user.id
    json.dni contract.user.dni
    json.full_name contract.user.full_name
    json.email contract.user.email
    json.phone contract.user.phone
end

json.entries contract.entries.with_attached_document do |entry|
    json.id entry.id
    json.details entry.details
    json.filename entry.document.filename
    json.author_id entry.author_id
    json.created_at entry.created_at.try { strftime("%F") }
    json.author entry.author.full_name
end
