class MoviesController < ApplicationController

    def possible_movies
        actor = Actor.find(params[:actor_id])
        # movies_that_year = Movie.find_by_year(params[:year]).shuffle.slice(0,10)
        current_movie = Movie.find(params[:current_movie])
        # possible_movies = movies_that_year.filter{ |m| !m.actors.include?(actor)}.slice(0,4)
        cast = current_movie.actors[0...10].filter{ |a| a.id != actor.id}
        movies_that_year = []
        cast.each do |a|
            a.movies.each do |m|
                if m.release_year == current_movie.release_year && !m.actors.include?(actor)
                    movies_that_year << m
                end
            end
        end
        possible_movies = movies_that_year.shuffle.slice(0,4)
        render json: possible_movies
    end

end
