class Api::ApiController < ApplicationController
  skip_before_filter :verify_authenticity_token
  protect_from_forgery with: :null_session


end
