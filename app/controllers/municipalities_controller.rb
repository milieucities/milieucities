class MunicipalitiesController < ApplicationController
  load_and_authorize_resource

  def index
    @no_header = true

    # TODO: remove when Guelph goes live
    @municipalities = @municipalities.where(name: 'Ottawa')
    respond_to do |format|
      format.html
      format.json
    end
  end
end
