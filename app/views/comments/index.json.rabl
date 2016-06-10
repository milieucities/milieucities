collection @dev_sites

attributes :address

child(:comments) { attributes :body

  child(:user) { attributes :first_name, :last_name, :email }

}
