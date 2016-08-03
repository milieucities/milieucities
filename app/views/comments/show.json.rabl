object @comment

attributes :id, :body, :created_at

child(:user) { attributes :first_name, :last_name, :username, :name, :email }
