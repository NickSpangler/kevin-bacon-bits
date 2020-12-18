Rails.application.routes.draw do
  get '/actors/auto_complete', to: 'actors#auto_complete'
  get '/actors/movie_list', to: 'actors#movie_list'
  get '/actors/get_photo', to: 'actors#get_photo'
  get '/actors/search_for_link', to: 'actors#search_for_link'
  get '/link', to: 'actors#link'

  get '/movies/get_possible_movies', to: 'movies#get_possible_movies'
  
  resources :movie_actors
  resources :actors
  resources :movies


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
