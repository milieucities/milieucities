class Api::V1::EventsController < Api::ApiController
  respond_to :json

  before_action :authenticate

  def index
    @events = Event.all
    respond_with @events
  end
end