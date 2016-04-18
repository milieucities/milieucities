Rails.application.routes.draw do

  get 'projects/index'

  get 'projects/show'

  get 'projects/new'

  get 'projects/edit'

  get 'projects/update'

  get 'projects/destroy'

  get 'projects/create'

  ## MAIN APP PAGE ##
  root 'static_pages#home'

  post '/survey', to: 'static_pages#submitSurvey'

  get '/citizencity', to: 'static_pages#citizencity'

  post '/rate' => 'rater#create', :as => 'rate'

  get 'all_user_comments', to: 'comments#all_user_comments'
  get 'all_devsite_comments', to: 'dev_sites#all_devsite_comments'
  get 'map', to: 'static_pages#map'
  get 'xml_data', to: 'dev_sites#xml_data'

  get 'events', to: 'static_pages#events'

  resources :dev_sites do
    resources :comments, module: :dev_sites
    get :geojson, on: :collection
    get :images, on: :member

    # Voting
    member do
      put "upvote", to: "dev_sites#upvote"
      put "downvote", to: "dev_sites#downvote"
    end

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
