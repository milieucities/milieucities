object false

node(:total) { |_| @total }

child(@dev_sites) {

  attributes :id, :devID, :featured, :title, :status, :status_date, :street, :address, :images, :description, :ward_name, :ward_num, :image_url, :hearts, :updated_at, :latitude, :longitude, :general_status

  child(:addresses) { attributes :id, :street }

  child(:statuses) { attributes :id, :status, :start_date, :end_date }

  child(:comments) { attributes :id, :body }

  child(:meetings) { attributes :id, :title, :date, :time, :meeting_type, :location }

  child(:application_files) { attributes :id, :application_type, :file_number }

  child(:contacts) { attributes :id, :contact_type, :first_name, :last_name, :email_address }
}
