class CreateAuthenticationTokens < ActiveRecord::Migration
  def change
    create_table :authentication_tokens do |t|
      t.string :token, null: false
      t.datetime :expires_at
      t.integer :user_id, null: false

      t.timestamps
    end
  end
end
