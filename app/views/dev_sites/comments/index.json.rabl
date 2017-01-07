object false

node(:total) { |_| @total }

child(@comments) {

  attributes :id, :body, :created_at, :vote_count

  child(:user) do
    attributes :id, :anonymous_comments, :name
  end

  node :voted_down do |comment|
    comment.voted_down(current_user)
  end

  node :voted_up do |comment|
    comment.voted_up(current_user)
  end

}
