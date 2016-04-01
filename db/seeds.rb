# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


#require 'unirest'

## Scripts ##

def set_all_hearts_to_zero
	sites = DevSite.all
	sites.each do |site|
		site.hearts = 0
		site.save!
	end
end

#set_all_hearts_to_zero()


# def get_dev_site_image_urls()

#   all_dev_sites = DevSite.all
#   puts "Total DevSites: #{all_dev_sites.length}"
#   url_counter = 0

#   all_dev_sites.each do |dev_site|
#     addresses = dev_site.addresses
#     if (addresses)
#       url_counter += 1
#       addresses.each do |address|
#         url = "https://maps.googleapis.com/maps/api/streetview?size=600x600&location=" + address["street"].to_s + "&key=AIzaSyAwocEz4rtf47zDkpOvmYTM0gmFT9USPAw"
#         begin
#           response = Unirest.get(url)
#         rescue Exception => e
#           puts "#{e.inspect}"
#           puts "Trying lat and long coords"
#           url = "https://maps.googleapis.com/maps/api/streetview?size=600x600&location=" + address["lat"].to_s + "," + address['lon'].to_s + "&key=AIzaSyAwocEz4rtf47zDkpOvmYTM0gmFT9USPAw"
#           response = Unirest.get(url)
#         end
#         if (response.code == 200)
#           dev_site.image_url = url
#         end
#         puts "dev_site ID: #{dev_site.id}"
#         puts "Url Counter: #{url_counter}"
#         puts "status: #{response.code}"
#         puts url
#         puts "=================\n"
#       end
#     end
#     dev_site.save!
#   end

# end


#get_dev_site_image_urls()

# def get_dev_ids(url)
#   response = Unirest.get(url)
#
#   f = File.new("dev_ids_Jan_7_2015", "w+")
#   response.body.each_with_index do |dev, index|
#     f.write(dev['devid'] + "\n")
#   end
#   f.close
# end
#
# def create_dev_apps_file(list_of_dev_ids)
#   f = File.new("devapp_endpoints_Jan_7_2015", "w+")
#   ids = File.open(list_of_dev_ids).read
#   ids.each_line do |id|
#     if (id != "" || id != nil)
#         f.write("http://ottwatch.ca/api/devapps/"+id)
#     end
#   end
#   f.close
# end
#
# def get_data(endpoints_list)
#   endpoints = File.open(endpoints_list).read
#
#   counter = 0
#   endpoints.each_line do |url|
#
#     dev = DevSite.new
#     response = Unirest.get(url)
#     dev.appID = response.body["appid"]
#     dev.devID = response.body["devid"]
#     dev.received_date = response.body["receiveddate"]
#     dev.updated = response.body["updated"]
#     dev.application_type = response.body["apptype"]
#     dev.ward_num = response.body["ward"]
#     dev.description = response.body["description"]
#     addresses = response.body["address"]
#
#     ## Save addresses of the dev site ##
#     if addresses
#       addresses.each do |address|
#         dev.addresses.build(lat: address["lat"], lon: address["lon"], street: address["addr"])
#       end
#     end
#
#     ## Save Statuses of the dev site ##
#     statuses = response.body["statuses"]
#     if statuses
#       statuses.each do |status|
#         dev.statuses.build(status_date: status["statusdate"], status: status["status"], created: status["created"])
#       end
#     end
#
#     dev.save
#     counter += 1
#     puts counter
#   end
#
# end

# url = "http://ottwatch.ca/api/devapps/all"
# get_dev_ids(url)
# create_dev_apps_file("dev_ids_Jan_7_2015")
# get_data("db/devapp_endpoints_Jan_7_2015")



require 'net/http'
require 'pry'
require 'json'

class Scrape

  def getAppIDs
    uri = URI('http://ottwatch.ca/api/devapps/all')
    res = Net::HTTP.get_response(uri)
    allApps = JSON.parse(res.body)

    devIDs = []
    allApps.each do |app|
      devIDs.push(app['devid'])
    end
    devIDs
  end

  def getDetailedInfo(id)
    uri = URI('http://ottwatch.ca/api/devapps/' + id.to_s)
    res = Net::HTTP.get_response(uri)
    app = JSON.parse(res.body)
  end

end

wards_councillor = [
  {"ward_name": "Orleans", "councillor": "Bob Monette"},
  {"ward_name": "Innes", "councillor": "Jody Mitic"},
  {"ward_name": "Barrhaven", "councillor": "Jan Harder"},
  {"ward_name": "Kanata North", "councillor": "Marianne Wilkinson"},
  {"ward_name": "West Carleton-March", "councillor": "Eli El-Chantiry"},
  {"ward_name": "Stittsville", "councillor": "Shad Qadri"},
  {"ward_name": "Bay", "councillor": "Mark Taylor"},
  {"ward_name": "College", "councillor": "Rick Chiarelli"},
  {"ward_name": "Knoxdale-Merivale", "councillor": "Keith Egli"},
  {"ward_name": "Gloucester-Southgate", "councillor": "Diane Deans"},
  {"ward_name": "Beacon Hill-Cyrville", "councillor": "Tim Tierney"},
  {"ward_name": "Rideau-Vanier", "councillor": "Mathieu Fleury"},
  {"ward_name": "Rideau-Rockcliffe", "councillor": "Tobi Nussbaum"},
  {"ward_name": "Somerset", "councillor": "Catherine McKenney"},
  {"ward_name": "Kitchissippi", "councillor": "Jeff Leiper"},
  {"ward_name": "River", "councillor": "Riley Brockington"},
  {"ward_name": "Capital", "councillor": "David Chernushenko"},
  {"ward_name": "Alta Vista", "councillor": "Jean Cloutier"},
  {"ward_name": "Cumberland", "councillor": "Stephen Blais"},
  {"ward_name": "Osgoode", "councillor": "George Darouze"},
  {"ward_name": "Rideau-Goulbourn", "councillor": "Scott Moffat"},
  {"ward_name": "Gloucester-South Nepean", "councillor": "Micahel Qaqish"},
  {"ward_name": "Kanata South", "councillor": "Allan Hubley"},
]


scraper = Scrape.new

devIDs = scraper.getAppIDs()

binding.pry

devIDs.each do |id|
  one = scraper.getDetailedInfo(id)
  dev_site = DevSite.new

  ## Insert into db for regular params
  dev_site.description = one['description'] if one['description']
  dev_site.appID = one["appid"] if one["appid"]
  dev_site.devID = one["devid"] if one["devid"]
  dev_site.received_date = one["receiveddate"] if one["receiveddate"]
  dev_site.updated = one["updated"] if one["updated"]
  dev_site.application_type = one["apptype"] if one["apptype"]
  dev_site.ward_num = one["ward"] if one["ward"]

  ## Insert Addresses
  addresses = one["address"]
  if addresses
    addresses.each do |address|
      dev_site.addresses.build(lat: address["lat"], lon: address["lon"], street: address["addr"])
    end
  end

  ## Insert Statuses
  statuses = one["statuses"]
  if statuses
    statuses.each do |status|
      dev_site.statuses.build(status_date: status["statusdate"], status: status["status"], created: status["created"])
    end
  end

  ## Insert File Urls
  files = one["files"]
  if files
    files.each do |file|

    end
  end

end