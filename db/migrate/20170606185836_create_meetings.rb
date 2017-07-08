class CreateMeetings < ActiveRecord::Migration
  def change
    create_table :meetings do |t|
      t.string :title
      t.string :meeting_type
      t.string :time
      t.datetime :date
      t.string :location
      t.belongs_to :dev_site

      t.timestamps null: false
    end
  end
end
