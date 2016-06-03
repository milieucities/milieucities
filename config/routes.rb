Rails.application.routes.draw do



  ## MAIN APP PAGE ##
  root 'static_pages#home'

  post '/survey', to: 'static_pages#submitSurvey'
  post '/citizensurvey', to: 'static_pages#submitSurveyCitizen'

  get '/citizencity', to: 'static_pages#citizencity'
  post '/contact_citizencity', to: 'static_pages#contact_citizencity'
  post '/contact_milieu', to: 'static_pages#contact_milieu'
  post '/contact_file_lead', to: 'static_pages#contact_file_lead'

  post '/rate' => 'rater#create', :as => 'rate'

  get 'map', to: 'static_pages#map'

  # Add about page route
  get 'about', to: 'static_pages#about'

  resources :dev_sites do
    resources :comments, module: :dev_sites do
      member do
        put "upvote", to: "comments#upvote"
        put "downvote", to: "comments#downvote"
      end
    end

    get :geojson, on: :collection
    get :images, on: :member

    # Voting
    member do
      put "upvote", to: "dev_sites#upvote"
      put "downvote", to: "dev_sites#downvote"
    end

  end

  resources :projects
  resources :events do
    resources :comments, module: :events do
      member do
        put "upvote", to: "comments#upvote"
        put "downvote", to: "comments#downvote"
      end
    end
    get :images, on: :member
    get :geojson, on: :collection
  end
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

  if Rails.env.production?
    get '*path' => redirect('/')
  end

end
