collection @dev_sites

attributes :address

child(:comments) do

  attributes :id, :body, :created_at, :vote_count

  node :voted_down do |comment|
    comment.voted_down(current_user)
  end

  node :voted_up do |comment|
    comment.voted_up(current_user)
  end

  child(:user) do
    attributes :first_name, :last_name, :username, :name,  :email, :name
  end

end
