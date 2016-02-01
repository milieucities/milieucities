Rails.application.routes.draw do
  resources :events
  post '/rate' => 'rater#create', :as => 'rate'
  devise_for :users, controllers: { omniauth_callbacks: "callbacks" }


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"

  get 'all_user_comments', to: 'comments#all_user_comments'
  get 'all_devsite_comments', to: 'dev_sites#all_devsite_comments'
  get 'heart', to: 'dev_sites#heart'
  get 'break_heart', to: 'dev_sites#break_heart'
  get 'demo', to: 'static_pages#demo'

  root 'static_pages#home'
  get 'events', to: 'static_pages#events'

  resources :dev_sites do
    resources :comments, module: :dev_sites
  end


  scope module: :api do
    scope module: :v1 do
      devise_scope :user do
        post 'registrations' => 'registrations#create', :as => 'register'
        post 'sessions' => 'sessions#create', :as => 'login'
        delete 'sessions' => 'sessions#destroy', :as => 'logout'
      end
      scope module: :maps do
        # Ottawa Map
        get 'ottawamap', to: 'ottawa_map#map'
        get 'loadWards', to: 'ottawa_map#loadGeoJsonData'
        get 'loadMarkers', to: 'ottawa_map#loadMarkers'
      end
    end
  end

  ##############################
  ### INTERNAL API ENDPOINTS ###
  ##############################



end
