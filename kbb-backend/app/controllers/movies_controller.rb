class MoviesController < ApplicationController

    def possible_movies
        actor = Actor.find(params[:actor_id])
        
        current_movie = Movie.find(params[:current_movie])

        cast = current_movie.actors[0...15].filter{ |a| a.id != actor.id}
        movies_that_year = []
        cast.each do |a|
            a.movies.each do |m|
                if m.release_year >= current_movie.release_year - 1 && m.release_year <= current_movie.release_year - 1 && !m.actors.include?(actor)
                    movies_that_year << m
                end
            end
        end
        possible_movies = movies_that_year.uniq.shuffle.slice(0,4)
        render json: possible_movies
    end

end
