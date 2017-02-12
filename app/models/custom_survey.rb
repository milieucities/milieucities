class CustomSurvey < ActiveRecord::Base
  has_many :survey_responses
end
