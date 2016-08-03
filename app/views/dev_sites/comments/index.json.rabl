object false

node(:total) { |_| @total }

child(@comments) {

  attributes :id, :body, :created_at

  child(:user) { attributes :username }

}
