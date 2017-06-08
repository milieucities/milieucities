class MunicipalitiesController < ApplicationController
  load_and_authorize_resource

  def index
    @no_header = true

    # TODO: remove when Guelph goes live
    # @municipalities = @municipalities.where.not(name: 'Guelph')
    respond_to do |format|
      format.html
      format.json
    end
  end
end
