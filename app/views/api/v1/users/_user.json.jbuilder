json.extract! user, :id, :first_name, :last_name, :full_name, :phone, :username, :email, :created_at, :updated_at
json.url api_v1_user_url(user, format: :json)
json.role user.role.name.titleize
json.contracts user.contracts, :id, :description, :kind
