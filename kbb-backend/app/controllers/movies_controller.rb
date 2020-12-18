class MoviesController < ApplicationController

    def get_possible_movies
        actor = Actor.find(params[:actor_id])
        possible_ movies = Movie.find_by_year(params[:year]).filter( |m| !m.actors.include?(actor)).shuffle.slice(0, 4)
        render json: possible_movies
    end
end
