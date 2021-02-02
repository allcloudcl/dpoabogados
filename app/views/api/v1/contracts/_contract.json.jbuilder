json.extract! contract, :id, :description, :created_at, :updated_at
json.url api_v1_contract_url(contract, format: :json)
json.kind contract.kind.titleize
json.user do
    json.id contract.user.id
    json.name contract.user.full_name
end
