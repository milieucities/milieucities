require 'net/http'
require 'json'

module MapData
  extend self

  @counter = 1
  @wards = {
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

  def create_dev_site(dev_app_id)
    begin
      dev_site_json =  Net::HTTP.get_response URI('http://ottwatch.ca/api/devapps/'+dev_app_id)
      dev_site = JSON.parse(dev_site_json.body)
    rescue Exception => msg
      puts msg.inspect
    end


    new_dev_site = DevSite.new(
      description: dev_site['description'],
      appID: dev_site['appid'],
      devID: dev_site['devid'],
      received_date: dev_site['receiveddate'],
      updated: dev_site['updated'],
      application_type: dev_site['apptype'],
      ward_num: dev_site['ward'],
      ward_name: @wards[dev_site['ward']]
    )

    dev_site['address'].each do |address|
      new_dev_site.addresses.build(
        lat: address['lat'],
        lon: address['lon'],
        geocode_lat: address['lat'],
        geocode_lon: address['lon'],
        street: address['addr'] + ', Ottawa, Ontario, Canada'
      )
    end

    dev_site['statuses'].each do |status|
      new_dev_site.statuses.build(
        status_date: status['statusdate'],
        status: status['status'],
        created: status['created']
      )
    end

    dev_site['files'].each do |file|
      new_dev_site.city_files.build(
        name: file['title'],
        link: file['href'],
        orig_created: file['created'],
        orig_update: file['updated']
      )
    end

    begin
      if new_dev_site.save
        puts @counter
        puts "Saved application - #{dev_site['devid']}"
        @counter += 1
      else
        puts "Did not save - #{dev_site['devid']}"
      end
    rescue Exception => msg
      puts 'Error retrieving new dev site'
      puts msg.inspect
    end

  end

  def update_dev_site(current_dev_site)
    begin
      dev_site_json =  Net::HTTP.get_response URI('http://ottwatch.ca/api/devapps/'+current_dev_site.devID)
      dev_site = JSON.parse(dev_site_json.body)
    rescue Exception => msg
      puts 'Error retrieving updated dev site'
      puts msg.inspect
    end

    if current_dev_site.updated == dev_site['updated']
      puts @counter
      puts "Latest application - #{dev_site['devid']}"
      @counter += 1
      return
    end

    current_dev_site.update(
      description: dev_site['description'],
      appID: dev_site['appid'],
      devID: dev_site['devid'],
      received_date: dev_site['receiveddate'],
      updated: dev_site['updated'],
      application_type: dev_site['apptype'],
      ward_num: dev_site['ward'],
      ward_name: @wards[dev_site['ward']]
    )

    current_dev_site.addresses.destroy_all
    current_dev_site.statuses.destroy_all
    current_dev_site.city_files.destroy_all

    dev_site['address'].each do |address|
      current_dev_site.addresses.build(
        lat: address['lat'],
        lon: address['lon'],
        geocode_lat: address['lat'],
        geocode_lon: address['lon'],
        street: address['addr'] + ', Ottawa, Ontario, Canada'
      )
    end

    dev_site['statuses'].each do |status|
      current_dev_site.statuses.build(
        status_date: status['statusdate'],
        status: status['status'],
        created: status['created']
      )
    end

    dev_site['files'].each do |file|
      current_dev_site.city_files.build(
        name: file['title'],
        link: file['href'],
        orig_created: file['created'],
        orig_update: file['updated']
      )
    end

    begin
      if current_dev_site.save
        puts @counter
        puts "Updated application - #{dev_site['devid']}"
        @counter += 1
      else
        puts "Did not save - #{dev_site['devid']}"
      end
    rescue Exception => msg
      puts msg.inspect
    end
  end

  puts 'Retrieving all dev sites from ottwatch'

  begin
    dev_sites_json = Net::HTTP.get_response URI('http://ottwatch.ca/api/devapps/all')
    dev_sites = JSON.parse(dev_sites_json.body)
  rescue Exception => msg
    puts 'Error retrieving dev sites from ottwatch'
    puts msg.inspect
  end

  dev_site_ids = dev_sites.map { |dev_site| dev_site['devid'] }

  dev_site_ids.first(50).each do |dev_site_id|
    dev_site = DevSite.find_by(devID: dev_site_id)
    dev_site.present? ? update_dev_site(dev_site) : create_dev_site(dev_site_id)
  end

end
