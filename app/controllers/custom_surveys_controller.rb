class CustomSurveysController < ApplicationController
  def typeform
    render json: {}, status: 200
  end
end
