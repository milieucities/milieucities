class CreateMeetings < ActiveRecord::Migration
  def change
    create_table :meetings do |t|
      t.string :meeting_type
      t.datetime :time
      t.string :location
      t.belongs_to :dev_site

      t.timestamps null: false
    end
  end
end
