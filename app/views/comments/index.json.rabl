collection @dev_sites

attributes :address

child(:comments) { attributes :id, :body, :created_at

  child(:user) { attributes :first_name, :last_name, :email }

}
