class CreateNoumeaResponses < ActiveRecord::Migration
  def change
    create_table :noumea_responses do |t|
      t.jsonb :response_body

      t.timestamps null: false
    end
  end
end
