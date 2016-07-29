object @comment

attributes :id, :body, :created_at

child(:user) { attributes :username }
