class SurveyResponse < ActiveRecord::Base
  belongs_to :custom_survey
  has_many :comments, as: :commentable, dependent: :destroy
  validate :token, uniqueness: true
  after_create :process_answers

  def process_answers
    question_ids = custom_survey.questions_for_analysis
    responses = JSON.parse(response_body)
    question_ids.each do |question_id|
      response = responses.find { |res| res['field']['id'] == question_id }
      response_text = response['text']
      comments << Comment.create(body: response_text)
    end
  end
end
