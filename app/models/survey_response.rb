class SurveyResponse < ActiveRecord::Base
  belongs_to :custom_survey
  has_many :comments, as: :commentable, dependent: :destroy
  validates :token, uniqueness: true
  after_create :process_answers

  def process_answers
    # this is currently creating a comment for every question that has a text answer.
    # our next step should be to create question and answer models so that the survey
    # has many questions that specify how they should be analyzed and the survey
    # responses have many answers, each one corresponding to a question and then the
    # answers would associates sentiments if a sentiment analysis is specified for the
    # question. That way we'll be able to see the sentiment averages per question.

    responses = response_body['answers'].select { |res| res['field']['type'] == 'long_text' }
    return if responses.empty?
    responses.each do |response|
      response_text = response['text']
      comments << Comment.create(body: response_text)
    end
  end
end
