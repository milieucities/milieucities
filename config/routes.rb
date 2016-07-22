Rails.application.routes.draw do

  scope '(:locale)', locale: /en|fr/ do
    root to: 'static_pages#home'

    get 'map', to: 'static_pages#map'
    get 'citizencity', to: 'static_pages#citizencity'

    get 'tos', to: 'static_pages#tos'
    get 'privacy', to: 'static_pages#privacy'

    resources :comments, only: [:index]

    resources :dev_sites do
      resources :comments, module: :dev_sites do
      end

      get :geojson, on: :collection
      get :images, on: :member

      collection do
        post :search
      end
    end

    resources :projects
    resources :events do
      resources :comments, module: :events do
      end
      get :images, on: :member
      get :geojson, on: :collection
    end

    post 'survey', to: 'static_pages#submitSurvey'
    post 'citizensurvey', to: 'static_pages#submitSurveyCitizen'

    post 'contact_citizencity', to: 'static_pages#contact_citizencity'
    post 'contact_milieu', to: 'static_pages#contact_milieu'
    post 'contact_file_lead', to: 'static_pages#contact_file_lead'
    post 'contact_councillor', to: 'static_pages#contact_councillor'

    # Add about page route
    get 'about', to: 'static_pages#about'

    resources :users, only: [:index, :new, :create, :destroy]
    resources :sessions, only: [:new, :create, :destroy]

  end

  root to: redirect('/', status: 302), as: :redirected_root

  # get '/*path', to: redirect('/#{I18n.default_locale}/%{path}', status: 302), constraints: {path: /(?!(#{I18n.available_locales.join('|')})\/).*/}, format: false

  # if Rails.env.production?
  get '*path' => redirect('/', status: 302)
  # end

end
