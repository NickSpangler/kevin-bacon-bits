class MoviesController < ApplicationController

    def possible_movies
        actor = Actor.find(params[:actor_id])
        current_movie = Movie.find(params[:current_movie])
        cast = current_movie.actors.filter{ |a| a.id != actor.id }
        movies_that_year = []

        if current_movie.release_year == nil
            cast.each do |a|
                a.movies.each do |m|
                    if !m.actors.include?(actor)
                        movies_that_year << m
                    end
                end
            end
            until movies_that_year.length >= 4
                extra_movie = Movie.find(rand(182697))
                movies_that_year << extra_movie unless extra_movie.actors.include?(actor)
            end
        else
            cast.each do |a|
                a.movies.each do |m|
                    if m.release_year != nil && m.release_year >= current_movie.release_year - 2 && m.release_year <= current_movie.release_year + 2 && !m.actors.include?(actor)
                        movies_that_year << m
                    end
                end
            end
            until movies_that_year.length >= 4
                extra_movie = Movie.find(rand(182697))
                movies_that_year << extra_movie unless extra_movie.actors.include?(actor)
            end
        end
        possible_movies = movies_that_year.uniq.shuffle.slice(0,4)
        render json: possible_movies
    end

    def auto_complete
        actor = Actor.find(params[:actor_id])
        movies = actor.movies.auto_complete(params[:input])
        render json: movies
    end

    def check_answer
        if params[:degree].to_i == 1
            results = Movie.check_first_degree_answer(params[:first_degree_target_a], params[:first_degree_movie], params[:first_degree_target_b])
        end
        render json: results
    end

    def check_answer2
        byebug
        # if params[:degree].to_i == 1
        #     results = Movie.check_first_degree_answer(params[:first_degree_target_a], params[:first_degree_movie], params[:first_degree_target_b])
        # end
        # render json: results
    end

end
