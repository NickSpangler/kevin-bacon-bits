class MoviesController < ApplicationController

    def possible_movies
        actor = Actor.find(params[:actor_id])
        movies_that_year = Movie.find_by_year(params[:year]).shuffle.slice(0,10)
        possible_movies = movies_that_year.filter{ |m| !m.actors.include?(actor)}.slice(0,4)

        render json: possible_movies
    end

end
