object @dev_site

attributes :id, :devID, :application_type, :title, :status, :status_date, :address, :images,
  :description, :ward_name, :ward_num, :image_url, :hearts, :updated_at, :latitude, :longitude

child(:addresses) { attributes :id, :street }

child(:statuses) { attributes :id, :status, :status_date }

child(:comments) { attributes :id, :body

  child(:user) { attributes :first_name, :last_name, :email }

}
