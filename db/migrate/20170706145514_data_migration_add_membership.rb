class DataMigrationAddMembership < ActiveRecord::Migration
  def up
    sample_org = Organization.find_or_create_by(name: "Claire Org")
    sample_user = User.find_or_create_by(email: "abc@123.com")

    sample_org.users << sample_user
  end
end
