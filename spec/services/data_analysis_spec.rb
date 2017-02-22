require 'spec_helper'
require 'data_analysis'

describe 'DataAnalysis' do
  include Services::DataAnalysis
  let(:comment1) { create(:comment) }
  let(:comment2) { create(:comment) }
  let(:comment3) { create(:comment) }
  let(:survey_response) { create :survey_response }

  before :each do
    comment3.sentiment.destroy
    comment3.reload
    survey_response.comments.push(comment1, comment2)
  end

  describe '#sum_of_comments_sentiment' do
    it 'should get the sum of a specific sentiment type for a collection of comments' do
      expected_result = comment1.sentiment.joy + comment2.sentiment.joy

      result = sum_of_comments_sentiment(survey_response.comments, :joy)

      expect(result).to eq(expected_result)
    end

    it 'should skip any comments that do not have a sentiment associated' do
      survey_response.comments << comment3

      expected_result = comment1.sentiment.joy + comment2.sentiment.joy

      result = sum_of_comments_sentiment(survey_response.comments, :joy)

      expect(result).to eq(expected_result)
    end
  end

  describe '#overall_sentiments' do
    it 'should sentiment averages and totals for a collection of comments' do
      expected_result = {
        averages: {
          anger: (comment1.sentiment.anger + comment2.sentiment.anger) / 2,
          joy: (comment1.sentiment.joy + comment2.sentiment.joy) / 2,
          fear: (comment1.sentiment.fear + comment2.sentiment.fear) / 2,
          sadness: (comment1.sentiment.sadness + comment2.sentiment.sadness) / 2,
          disgust: (comment1.sentiment.disgust + comment2.sentiment.disgust) / 2
        },
        totals: {
          anger: comment1.sentiment.anger + comment2.sentiment.anger,
          joy: comment1.sentiment.joy + comment2.sentiment.joy,
          fear: comment1.sentiment.fear + comment2.sentiment.fear,
          sadness: comment1.sentiment.sadness + comment2.sentiment.sadness,
          disgust: comment1.sentiment.disgust + comment2.sentiment.disgust
        }
      }

      result = overall_sentiments(survey_response.comments)

      expect(result).to eq(expected_result)
    end
  end
end
