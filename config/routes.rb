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
      resources :jobs do
        resources :time_entries
      end
    end
  end
end
