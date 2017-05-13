class AddFlaggedAsOffensiveToComments < ActiveRecord::Migration
  def change
    add_column :comments, :flagged_as_offensive, :boolean, default: false
  end
end
