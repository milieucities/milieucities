class CreateWakefieldCustomSurvey < ActiveRecord::Migration
  def up
    form_fields = {
     "fields"=>
      [{"id"=>"42471745", "title"=>"How many people use the water that you collect?", "type"=>"number"},
       {"id"=>"42471736", "title"=>"Please tell us a bit more about how you use the spring water:", "type"=>"list"},
       {"id"=>"42471742",
        "title"=>"Do you have any safety concerns about the site of the spring, the drinkability of the water, or anything else?",
        "type"=>"textarea"},
       {"id"=>"42471744", "title"=>"In litres, can you tell us approximately how much water you collect during a visit?", "type"=>"number"},
       {"id"=>"42471732", "title"=>"Please tell us your first name", "type"=>"textfield"},
       {"id"=>"42471733", "title"=>"Please tell us your last name:", "type"=>"textfield"},
       {"id"=>"42471741",
        "title"=>"How do you think the spring fits into the history of Wakefield and the surrounding areas?",
        "type"=>"textarea"},
       {"id"=>"42471737", "title"=>"How often do you visit the Wakefield spring?", "type"=>"list"},
       {"id"=>"42471746", "title"=>"In years, how long have you been coming to the spring?", "type"=>"number"},
       {"id"=>"42471734", "title"=>"Please provide us with your postal code (ie. A1AA1A)", "type"=>"textfield"},
       {"id"=>"42471739",
        "title"=>"In your use of the spring, can you tell us about the positive aspects that you enjoy?",
        "type"=>"textarea"},
       {"id"=>"42471740",
        "title"=>"In your use of the spring, can you tell us about the negative aspects that you would change if you could?",
        "type"=>"textarea"},
       {"id"=>"42471735", "title"=>"Thanks {{answer_42471732}}, please provide us an email we can reach you at.", "type"=>"email"},
       {"id"=>"42471738",
        "title"=>"If there are other ways you use the spring water please tell us a bit more about it here:",
        "type"=>"textarea"},
       {"id"=>"42471743",
        "title"=>"As a community member, can you tell us what the spring means to you outside of being a water source?",
        "type"=>"textarea"}],
      "fields_for_analysis"=>["42471743"]
      }
    CustomSurvey.create(title: 'Wakefield Spring Survey', typeform_id: 'HHlHgX', form_fields: form_fields)
  end

  def down
    CustomSurvey.find_by(typeform_id: 'HHlHgX').destroy
  end
end
