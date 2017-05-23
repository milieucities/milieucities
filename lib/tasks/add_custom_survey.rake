desc "creates a new custom survey in the database. Usage: rake create_custom_survey['Wakefield Survey(EN)','O4FwtT']"
task :create_custom_survey, [:title, :typeform_id] => [:environment] do |t, args|
  puts "Creating custom survey #{args[:title]}"
  CustomSurvey.create(title: args[:title], typeform_id: args[:typeform_id])
end