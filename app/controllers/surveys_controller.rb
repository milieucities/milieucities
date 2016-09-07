class SurveysController < ApplicationController
  load_and_authorize_resource :user
  load_and_authorize_resource :survey, :through => :user, :singleton => true

  def show
  end

  def edit
  end

  def update
    if @survey.update(survey_params)
      render json: @survey, status: :ok
    else
      render json: @survey.errors, status: :unprocessable_entity
    end
  end

  private
  def survey_params
    params.require(:survey).permit(:lived_in_neighborhood, :neighborhood_description,
      :community_involvement, :biking_infrastructure, :urban_intensification,
      :heritage, :interesting_neighborhood_topics)
  end

end
