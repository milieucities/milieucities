class Api::V1::UserController < Api::V1::ApiController
  before_action :authenticate_request

  def show
  end

end
