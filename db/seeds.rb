# # This file should contain all the record creation needed to seed the database with its default values.
# # The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
# #
# # Examples:
# #
# #   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
# #   Mayor.create(name: 'Emanuel', city: cities.first)


# #require 'unirest'

# ## Scripts ##

# def set_all_hearts_to_zero
# 	sites = DevSite.all
# 	sites.each do |site|
# 		site.hearts = 0
# 		site.save!
# 	end
# end

# #set_all_hearts_to_zero()


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

# # url = "http://ottwatch.ca/api/devapps/all"
# # get_dev_ids(url)
# # create_dev_apps_file("dev_ids_Jan_7_2015")
# # get_data("db/devapp_endpoints_Jan_7_2015")



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
  end

  def getCouncillorInfo(p)
    name = p[:councillor].split(" ")
    uri = URI('http://ottwatch.ca/api/councillors/'+ name[1].to_s + '/' + name[0].to_s)
    res = Net::HTTP.get_response(uri)
  end

end

wards = {
  "1" => "ORLEANS",
  "2" => "INNES",
  "3" => "BARRHAVEN",
  "4" => "KANATA NORTH",
  "5" => "WEST CARLETON-MARCH",
  "6" => "STITTSVILLE",
  "7" => "BAY",
  "8" => "COLLEGE",
  "9" => "KNOXDALE-MERIVALE",
  "10" => "GLOUCESTER-SOUTHGATE",
  "11" => "BEACON HILL-CYRVILLE",
  "12" => "RIDEAU-VANIER",
  "13" => "RIDEAU-ROCKCLIFFE",
  "14" => "SOMERSET",
  "15" => "KITCHISSIPPI",
  "16" => "RIVER",
  "17" => "CAPITAL",
  "18" => "ALTA VISTA",
  "19" => "CUMBERLAND",
  "20" => "OSGOODE",
  "21" => "RIDEAU-GOULBOURN",
  "22" => "GLOUCESTER-SOUTH NEPEAN",
  "23" => "KANATA SOUTH"
}

## MAKE SURE TO TURN OFF GEOCODER WHEN RUNNING SEEDS FILE

scraper = Scrape.new
devIDs = scraper.getAppIDs()

# Insert DevIds into DB ##
counter = 1
devIDs.first(200).each do |id|
  one = scraper.getDetailedInfo(id)

  if one.code == "200"
    two = JSON.parse(one.body)

    dev_site = DevSite.new

    ## Insert into db for regular params
    dev_site.description = two['description'] if two['description']
    dev_site.appID = two["appid"] if two["appid"]
    dev_site.devID = two["devid"] if two["devid"]
    dev_site.received_date = two["receiveddate"] if two["receiveddate"]
    dev_site.updated = two["updated"] if two["updated"]
    dev_site.application_type = two["apptype"] if two["apptype"]


    ## Insert Ward Names (from ward numbers)
    if two["ward"]
      dev_site.ward_num = two["ward"]
      dev_site.ward_name = wards[two["ward"]]
    end

    ## Insert Addresses
    addresses = two["address"]
    unless addresses.empty?
      addresses.each do |address|
        next unless address["addr"].present?
        dev_site.addresses.build(
          lat: address["lat"],
          lon: address["lon"],
          geocode_lat: address["lat"],
          geocode_lon: address["lon"],
          street: address["addr"] + ", Ottawa, Ontario, Canada"
        )
      end
    else
      next
    end

    ## Insert Statuses
    statuses = two["statuses"]
    unless statuses.empty?
      statuses.each do |status|
        dev_site.statuses.build(
          status_date: status["statusdate"],
          status: status["status"],
          created: status["created"]
        )
      end
    end

    ## Insert Files
    files = two["files"]
    unless files.empty?
      files.each do |file|
        dev_site.city_files.build(
          name: file["title"],
          link: file["href"],
          orig_created: file["created"],
          orig_update: file["updated"]
        )
      end
    end

    ## Save to database
    begin
      if dev_site.save
        puts counter
        puts "Saved application - #{two['devid']}"
      else
        puts "Did not save - #{two['devid']}"
      end
    rescue Exception => msg
      puts msg.inspect
    end

    counter += 1

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
    {"ward_name": "Rideau-Goulbourn", "councillor": "Scott Moffatt"},
    {"ward_name": "Gloucester-South Nepean", "councillor": "Michael Qaqish"},
    {"ward_name": "Kanata South", "councillor": "Allan Hubley"},
  ]

# ## Insert Councillors
# # counter = 1
# # wards_councillor.each do |p|

# #   counc = scraper.getCouncillorInfo(p)

# #   if counc.code == "200"
# #     begin
# #       cc = JSON.parse(counc.body)
# #       councillor = Councillor.new
# #       councillor.ward_name = cc["ward"]
# #       councillor.ward_num = cc["wardnum"]
# #       councillor.office = cc["office"]
# #       councillor.first_name = cc["first_name"]
# #       councillor.last_name = cc["last_name"]
# #       councillor.email = cc["email"]
# #       councillor.link = cc["url"]
# #       councillor.photo_link = cc["photourl"]
# #       councillor.phone = cc["phone"]

# #       if councillor.save
# #         puts "Saved #{cc['first_name']}"
# #         puts counter
# #       else
# #         puts "Did not save #{cc['first_name']}"
# #       end

# #       counter += 1

# #     rescue Exception => e
# #       puts "not a valid JSON"
# #       puts e.backtrace.join("\n")
# #       puts "================="
# #     end
# #   end

# # end
# >>>>>>> f13435781105d3600de43f76a50ebe09054e5dde
