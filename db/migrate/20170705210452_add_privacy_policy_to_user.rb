class AddPrivacyPolicyToUser < ActiveRecord::Migration
  def change
    add_column :users, :accepted_privacy_policy, :boolean, default: false
  end
end
