Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
   namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resources :profiles, only: [:index, :create, :show, :update]
    resource :session, only: [:create, :destroy]
   end

   root "static_pages#root"
end
