Rails.application.routes.draw do

  scope '(:locale)', locale: /en|fr/ do
    root to: 'static_pages#home'

    namespace :static_pages, path: '/', as: nil do
      get 'map'
      get 'citizencity'
      get 'tos'
      get 'privacy'
      get 'about'
      post 'contact_citizencity'
      post 'contact_milieu'
      post 'contact_file_lead'
      post 'contact_councillor'
    end


    resources :dev_sites do
      resources :comments, module: :dev_sites do
      end

      member do
        get :images
      end

      collection do
        post :search
        get :geojson
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
    resources :users, only: [:index, :new, :create, :destroy]
    resources :sessions, only: [:new, :create, :destroy]

  end

  root to: redirect('/', status: 302), as: :redirected_root
  # get '/*path', to: redirect('/#{I18n.default_locale}/%{path}', status: 302), constraints: {path: /(?!(#{I18n.available_locales.join('|')})\/).*/}, format: false
  get '*path' => redirect('/', status: 302)

end
