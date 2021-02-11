class Api::V1::BaseController < ApplicationController
  # Let all controller that inherit from ApplicationController handle token
  # authentication for the User model. In case simple_authentication_token
  # fails, raise an exception.
  acts_as_token_authentication_handler_for User, fallback: :exception

  # For this is our APIs Base Controller, we will answer with JSON by default
  respond_to :json
end
