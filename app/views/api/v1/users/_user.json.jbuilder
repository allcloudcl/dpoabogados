json.extract! user, :id, :dni, :first_name, :last_name, :full_name, :phone, :username, :email, :address, :created_at, :updated_at
json.url api_v1_user_url(user, format: :json)
json.role user.roles.first.name.titleize
json.contracts user.contracts, :id, :description, :kind
