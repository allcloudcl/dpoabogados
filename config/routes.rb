Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :contracts do
        resources :entries, only: [:create, :update, :destroy]
      end
      resources :users
    end
  end

  get 'home/index'
  devise_for :users, defaults: { format: :json }, controllers: {sessions: 'users/sessions'}
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'home#index'

  get '/*path' => 'home#index'
end
