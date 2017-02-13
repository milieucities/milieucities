class CreateSurveyResponses < ActiveRecord::Migration
  def change
    create_table :survey_responses do |t|
      t.integer :custom_survey_id
      t.jsonb   :response_body
      t.datetime :submitted_at
      t.string :token

      t.timestamps null: false
    end
  end
end
