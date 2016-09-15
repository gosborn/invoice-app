Rails.application.routes.draw do
  devise_for :users

  root 'home#index'

  api_options =
  {
    constraints: {
      format: :json
    },
    defaults: {
      format: :json
    }
  }

  namespace :api, api_options do
    namespace :v1 do
      resources :invoices, only: :index
      resources :jobs, only: [:index, :create, :update, :destroy] do
        resources :time_entries, only: [:index, :create, :update, :destroy]
      end
    end
  end
end
