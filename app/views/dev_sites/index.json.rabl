collection @dev_sites

attributes :id, :devID, :application_type, :title, 
  :description, :ward_name, :ward_num, :image_url, :hearts, :updated_at

child(:addresses) { attributes :id, :street }

child(:statuses) { attributes :id, :status, :status_date }

