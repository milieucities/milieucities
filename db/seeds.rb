# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


require 'unirest'

## Scripts ##
def get_dev_site_image_urls()

  all_dev_sites = DevSite.all
  puts "Total DevSites: #{all_dev_sites.length}"
  url_counter = 0

  all_dev_sites.each do |dev_site|
    addresses = dev_site.addresses
    if (addresses)
      url_counter += 1
      addresses.each do |address|
        url = "https://maps.googleapis.com/maps/api/streetview?size=600x600&location=" + address["street"].to_s + "&key=AIzaSyAwocEz4rtf47zDkpOvmYTM0gmFT9USPAw"
        begin
          response = Unirest.get(url)
        rescue Exception => e
          puts "#{e.inspect}"
          puts "Trying lat and long coords"
          url = "https://maps.googleapis.com/maps/api/streetview?size=600x600&location=" + address["lat"].to_s + "," + address['lon'].to_s + "&key=AIzaSyAwocEz4rtf47zDkpOvmYTM0gmFT9USPAw"
          response = Unirest.get(url)
        end
        if (response.code == 200)
          dev_site.image_url = url
        end
        puts "dev_site ID: #{dev_site.id}"
        puts "Url Counter: #{url_counter}"
        puts "status: #{response.code}"
        puts url
        puts "=================\n"
      end
    end
    dev_site.save!
  end

end

get_dev_site_image_urls()


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
