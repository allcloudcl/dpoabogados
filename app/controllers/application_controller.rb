class ApplicationController < ActionController::Base
  # We want to use null sessions when our requests are json calls (our API)
  protect_from_forgery with: :null_session, if: :json_request?

  # Let all controller that inherit from ApplicationController handle token
  # authentication for the User model. In case simple_authentication_token
  # fails, raise an exception.
  acts_as_token_authentication_handler_for User, fallback: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def json_request?
    request.format.json?
  end

  def configure_permitted_parameters
    added_attrs = [:username, :email, :password, :password_confirmation, :remember_me]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end
end
