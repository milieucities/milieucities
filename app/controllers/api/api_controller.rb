class Api::ApiController < ApplicationController
  skip_before_filter :verify_authenticity_token, :if => Proc.new { |c| c.request.format == 'application/json'}
  protect_from_forgery with: :null_session, :if => Proc.new { |c| c.request.format == 'application/json'}


end
