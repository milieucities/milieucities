Rails.application.routes.draw do

  ## MAIN APP PAGE ##
  root 'static_pages#home'

  post '/rate' => 'rater#create', :as => 'rate'

  get 'all_user_comments', to: 'comments#all_user_comments'
  get 'all_devsite_comments', to: 'dev_sites#all_devsite_comments'
  get 'heart', to: 'dev_sites#heart'
  get 'break_heart', to: 'dev_sites#break_heart'
  get 'demo', to: 'static_pages#demo'

  get 'events', to: 'static_pages#events'

  resources :dev_sites do
    resources :comments, module: :dev_sites
  end

  resources :events


  ##############################
  ### INTERNAL API ENDPOINTS ###
  ##############################

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      ## USER REGISTRATIONS ##
      resources :registrations, only: [:create, :destroy]

      ## SESSIONS ##
      namespace :sessions, path: '/', as: nil do
        post :login_authentication
        get  :access_student
        get  :access_admin
        get  :login
        get  :logout
      end

      scope module: :maps do
        # Ottawa Map
        get 'ottawamap', to: 'ottawa_map#map'
        get 'loadWards', to: 'ottawa_map#loadGeoJsonData'
        get 'loadMarkers', to: 'ottawa_map#loadMarkers'
      end
    end
  end





end
