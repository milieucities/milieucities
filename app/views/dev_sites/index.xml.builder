xml.instruct!
xml.dev_sites do
  @dev_sites.each do |dev_site|
    xml.dev_site do
      xml.id dev_site.id
      xml.dev_id dev_site.devID
      xml.app_id dev_site.appID
      xml.image_url dev_site.image_url
      xml.app_type dev_site.application_type
      xml.description dev_site.description
      xml.ward_num dev_site.ward_num
      xml.addresses do
        dev_site.addresses.each do |address|
          xml.address do
            xml.lat address.lat
            xml.lon address.lon
            xml.street address.street
          end
        end
      end
      xml.statuses do
        dev_site.statuses.each do |status|
          xml.status do
            xml.status_date status.status_date
            xml.status status.status
            xml.created status.created
          end
        end
      end
    end
  end
end
