Rails.application.routes.draw do

  scope '(:locale)', locale: /en|fr/ do
    root to: 'pages#home'

    namespace :pages, path: '/', as: nil do
      get 'map'
      get 'citizencity'
      get 'tos'
      get 'privacy'
      post 'contact_citizencity'
      post 'contact_milieu'
      post 'contact_file_lead'
      post 'contact_councillor'
    end

    #omniauth
    namespace :omniauth, path: '/', as: nil do
      get :create, path: 'auth/:facebook/callback'
      get :create, path: 'auth/:twitter/callback'
      get :create, path: 'auth/:google/callback'
    end

    resources :conversations
    resources :newsletter_subscriptions, only: [:create]
    resources :dev_sites do
      resources :comments, module: :dev_sites do
      end

      member do
        get :images
      end

    end

    resources :events do
      resources :comments, module: :events do
      end

      member do
        get :images
      end

      collection do
        get :geojson
      end
    end

    resources :comments, only: [:index]
    resources :users, only: [:index, :new, :create, :destroy] do
      resource :profile, only: [:edit, :update, :show]
      resources :votes, only: [:create, :destroy]
      resource :survey, only: [:edit, :update, :show]
    end
    resources :sessions, only: [:new, :create, :destroy]

  end

# Backend API Routing
  scope '/api/v1' do
    resources :dev_sites do
      resources :comments, module: :dev_sites do
      end
      member do
        get :images
      end

    end
  end

  root to: redirect("/#{I18n.default_locale}", status: 302), as: :redirected_root
  get '*path' => redirect("/#{I18n.default_locale}", status: 302)

end
