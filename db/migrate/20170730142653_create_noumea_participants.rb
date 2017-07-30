class CreateNoumeaParticipants < ActiveRecord::Migration
  def change
    create_table :noumea_participants do |t|
      t.integer :age
      t.boolean :noumeaCitizen
      t.string :email
      t.string :area
      t.string :howLong

      t.timestamps null: false
    end
  end
end
