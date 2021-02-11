class ApplicationController < ActionController::Base
  # We want to use null sessions when our requests are json calls (our API)
  protect_from_forgery with: :null_session, if: :json_request?

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
