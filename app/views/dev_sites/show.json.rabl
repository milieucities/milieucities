object @dev_site

attributes :id, :devID, :featured, :title, :status, :status_date, :street, :address, :images, :description, :short_description, :ward_name, :ward_num, :image_url, :updated_at, :latitude, :longitude, :municipality_id, :ward_id, :updated, :general_status, :url_full_notice

node(:likes_count) { |dev_site| dev_site.likes.count  }

node(:like) { |dev_site| Like.find_by(user_id: current_user.id, dev_site_id: dev_site.id).try(:attributes) }

node(:url) { |dev_site| dev_site_url(dev_site.id) }

child(files: :files) do
  attributes :url

  node :name do |f|
    f.file.filename.split('.').first
  end

  node :extension do |f|
    f.file.extension
  end

end

child(:addresses) { attributes :id, :street, :city, :province_state, :country }

child(:city_files) { attributes :id, :link, :name }

child(:application_files) { attributes :id, :application_type, :file_number }

child(:contacts) { attributes :id, :contact_type, :first_name, :last_name, :email_address }

child :statuses do
  attributes :id, :status, :start_date, :end_date
  child(:meeting) { attributes :id, :title, :date, :time, :meeting_type, :location }
  child(:notification) do
    attributes :id, :notification_type, :send_at
    child(:notice, if: lambda { |notification| notification.notice.url }) do
      attributes :url

      node :name do |f|
        f.file.filename.split('/').last
      end
    end
  end
end

child :sentiment do
  attributes :anger, :disgust, :sadness, :joy, :fear, :id
end

node :guelph do |dev_site|
  dev_site.municipality_id == Municipality.find_by(name: 'Guelph').id
end
