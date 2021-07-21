class Users::SessionsController < Devise::SessionsController
  def create
    respond_to do |format|
       format.any(*navigational_formats) { super }
       format.json do
         self.resource = warden.authenticate!(auth_options)
         sign_in(resource_name, resource)
         respond_with_authentication_token(resource)
       end
    end
  end

  protected

  def respond_with_authentication_token(resource)
    render json: {
      user: {
        id: resource.id,
        first_name: resource.first_name,
        last_name: resource.last_name,
        full_name: resource.full_name,
        phone: resource.phone,
        email: resource.email,
        username: resource.username,
        dni: resource.dni,
        address: resource.address,
        authentication_token: resource.authentication_token
      }
    }
  end
end
