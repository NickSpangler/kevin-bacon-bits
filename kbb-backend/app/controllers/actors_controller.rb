class ActorsController < ApplicationController

    def auto_complete
        actors = Actor.auto_complete(params[:input]).limit(10)
        render json: actors
    end

    def get_photo
        actor = Actor.find(params[:input])
            render json: actor
    end

    def movie_list
        actor = Actor.find(params[:input])
        render json: actor, :include => [:movies, :movie_actors]
    end

    def search_for_link
        target_a = Actor.find(params[:target_a])
        target_b = Actor.find(params[:target_b])
        if !target_a 
            results = { value: "Sorry, #{params[:target_a]} is not in our database. Please search for another actor."}
        elsif !target_b
            results = { value: "Sorry, #{params[:target_b]} is not in our database. Please search for another actor."}
        else
            results = Actor.find_link(target_a, target_b)
        end
        render json: results
    end

end
