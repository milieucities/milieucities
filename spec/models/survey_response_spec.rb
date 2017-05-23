require 'spec_helper'
require 'pry'

describe SurveyResponse do
  describe '#process_answers' do
    it 'should generate a associated Comment for each text answer' do
      survey_response = create(:survey_response, :with_responses)
      expect(survey_response.comments.count).to eq(7)
    end

    it 'should not create any Comments if there are no text answers' do
      survey_response = create(:survey_response)
      expect(survey_response.comments.count).to eq(0)
    end
  end
end
