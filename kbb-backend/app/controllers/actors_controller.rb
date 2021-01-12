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
        if params[:target_a] == "" || params[:target_b] == ""
            results = { value: "Please enter two actors' names, and click to select them from the dropdown menus."}
        else
            target_a = Actor.find(params[:target_a])
            target_b = Actor.find(params[:target_b])
            results = Actor.find_link(target_a, target_b)
        end
        render json: results
    end

    def start_SDChallenge
        target_a = Actor.find(params[:actor_id])
        degree = params[:degree]
        results = Actor.start_SDChallenge(target_a, degree)
        render json: results, :include => [:movies, :movie_actors]
    end

end
