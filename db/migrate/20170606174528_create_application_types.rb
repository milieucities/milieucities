class CreateApplicationTypes < ActiveRecord::Migration
  def change
    create_table :application_types do |t|
      t.string :name, null: false
    end

    ApplicationType::VALID_APPLICATION_TYPES.each do |name|
      ApplicationType.create(name: name)
    end
  end
end
