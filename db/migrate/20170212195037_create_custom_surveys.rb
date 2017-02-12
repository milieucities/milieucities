class CreateCustomSurveys < ActiveRecord::Migration
  def change
    create_table :custom_surveys do |t|
      t.string :title
      t.string :typeform_id
      t.jsonb  :form_fields

      t.timestamps null: false
    end
  end
end
