# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


require 'unirest'

def get_dev_ids(url)
  response = Unirest.get(url)

  f = File.new("dev_ids_Jan_7_2015", "w+")
  response.body.each_with_index do |dev, index|
    f.write(dev['devid'] + "\n")
  end
  f.close
end

def create_dev_apps_file(list_of_dev_ids)
  f = File.new("devapp_endpoints_Jan_7_2015", "w+")
  ids = File.open(list_of_dev_ids).read
  ids.each_line do |id|
    if (id != "" || id != nil)
        f.write("http://ottwatch.ca/api/devapps/"+id)
    end
  end
  f.close
end

def get_data(endpoints_list)
  endpoints = File.open(endpoints_list).read

  counter = 0
  endpoints.each_line do |url|
    dev = DevSite.new
    response = Unirest.get(url)
    dev.devID = response.body["devid"]
    dev.application_type = response.body["apptype"]
    dev.ward_num = response.body["ward"]
    dev.description = response.body["description"]
    counter += 1
    puts counter
    dev.save
  end

end

# url = "http://ottwatch.ca/api/devapps/all"
# get_dev_ids(url)
# create_dev_apps_file("dev_ids_Jan_7_2015")
get_data("db/devapp_endpoints_Jan_7_2015")
