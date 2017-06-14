object @comment

attributes :id, :body, :created_at, :vote_count

node :voted_down do |comment|
  comment.voted_down(current_user)
end

node :voted_up do |comment|
  comment.voted_up(current_user)
end

child :user do
  attributes :id, :anonymous_comments, :name
end

node :author_name do |comment|
  comment.user.name_from_profile
end