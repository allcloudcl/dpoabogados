Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :contracts
      resources :users
    end
  end

  get 'home/index'
  devise_for :users, only: [:sessions], controllers: {sessions: 'users/sessions'}
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'home#index'

  get '/*path' => 'home#index'
end
