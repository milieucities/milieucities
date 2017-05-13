class AddFlaggedAsOffensiveToComments < ActiveRecord::Migration
  def change
    add_column :comments, :flagged_as_offensive, :string, default: Comment::UNFLAGGED_STATUS
  end
end
