Rails.application.routes.draw do
  resources :movie_actors
  resources :actors
  resources :movies
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
