require 'pry'

class SurveyResponse < ActiveRecord::Base
  belongs_to :custom_survey
  has_many :comments, as: :commentable, dependent: :destroy
  validates :token, uniqueness: true
  after_create :process_answers

  WAKEFIELD_FIELD_FOR_ANALYSIS = '42471743'.freeze

  def process_answers
    # this is currently funnelling all survey response texts for one quesiton
    # into the same collection of comments for this survey response.
    # our next step should be to create question and answer models so that the survey
    # has many questions that specify how they shoudl be analyzed and the survey
    # responses have many answers, each one corresponding to a question and then the
    # answers would associates sentiments if a sentiment analysis is specified for the
    # question. That way we'll be able to see the sentiment averages per question.

    response = response_body['answers'].find { |res| res['field']['id'] == WAKEFIELD_FIELD_FOR_ANALYSIS }
    return unless response
    response_text = response['text']
    comments << Comment.create(body: response_text)
  end
end
