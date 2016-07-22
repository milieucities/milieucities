class Profile < ActiveRecord::Base
  belongs_to :user
  # THIS ARRAY MUST BE IN ORDER BY EACH WARDS, WARD NUMBER
  VALID_NEIGHBOURHOOD_TYPES = [ "Orleans", "Innes", "Barrhaven", "Kanata North",
    "West Carleton-March", "Stittsville", "Bay", "College", "Knoxdale-Merivale",
    "Gloucester-Southgate", "Beacon Hill-Cyrville", "Rideau-Vanier", "Rideau-Rockcliffe",
    "Somerset", "Kitchissippi", "River", "Capital", "Alta Vista", "Cumberland", "Osgoode",
    "Rideau-Goulbourn", "Gloucester-South Nepean", "Kanata South"]

end
