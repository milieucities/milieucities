Rails.application.routes.draw do

  ## MAIN APP PAGE ##
  root 'static_pages#home'

  post '/survey', to: 'static_pages#submitSurvey'

  post '/rate' => 'rater#create', :as => 'rate'

  get 'all_user_comments', to: 'comments#all_user_comments'
  get 'all_devsite_comments', to: 'dev_sites#all_devsite_comments'
  get 'heart', to: 'dev_sites#heart'
  get 'map', to: 'static_pages#map'
  get 'break_heart', to: 'dev_sites#break_heart'
  get 'xml_data', to: 'dev_sites#xml_data'

  get 'events', to: 'static_pages#events'

  # Add about page route
  get 'about', to: 'static_pages#about'

  resources :dev_sites do
    resources :comments, module: :dev_sites
    get :geojson, on: :collection
    get :images, on: :member
  end

  resources :events, only: [:index, :show, :destroy, :create]
  resources :users
  resources :sessions, only: [:new, :create, :destroy]

  ##############################
  ### INTERNAL API ENDPOINTS ###
  ##############################

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      ## USER REGISTRATIONS ##
      resources :registrations, only: [:create, :destroy, :index, :show]

      ## SESSIONS ##
      namespace :sessions, path: '/', as: nil do
        post :login_authentication
        get  :login
        get  :logout
      end

      ## EVENTS ##
      resources :events

      ## DEV SITES ##
      resources :dev_sites

      scope module: :maps do
        # Ottawa Map
        get 'ottawamap', to: 'ottawa_map#map'
        get 'loadWards', to: 'ottawa_map#loadGeoJsonData'
        get 'loadMarkers', to: 'ottawa_map#loadMarkers'
      end
    end
  end

end
