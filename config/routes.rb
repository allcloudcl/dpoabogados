Rails.application.routes.draw do
  defaults format: :json do
    namespace :api do
      namespace :v1 do
        resources :calendars
        resources :contracts do
          post 'search', on: :collection
          resources :entries, only: [:create, :update, :destroy]
        end
        resources :schedules
        resources :users
      end
    end
    devise_for :users, controllers: {sessions: 'users/sessions'}
  end

  get 'home/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'home#index'

  # https://github.com/rails/rails/issues/31228#issuecomment-352900551
  get '/*all', to: 'home#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
