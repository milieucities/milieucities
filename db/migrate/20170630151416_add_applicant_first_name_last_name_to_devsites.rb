class AddApplicantFirstNameLastNameToDevsites < ActiveRecord::Migration
  def change
    remove_column :dev_sites, :applicant
    add_column :dev_sites, :applicant_first_name, :string
    add_column :dev_sites, :applicant_last_name, :string
  end
end
