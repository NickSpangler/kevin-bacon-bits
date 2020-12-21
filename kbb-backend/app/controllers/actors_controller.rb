class ActorsController < ApplicationController

    def auto_complete
        actors = Actor.auto_complete(params[:input]).limit(3)
        render json: actors
    end

    def get_photo
        actor = Actor.find_by(name: params[:input])
        if actor.profile_path
            render json: actor, :only => [:profile_path]
        else
            render json: {profile_path: 'No image available'}
        end
    end

    def movie_list
        actor = Actor.auto_complete(params[:input]).limit(1)
        render json: actor, :include => [:movies, :movie_actors]
    end

    def search_for_link
        # find both actors by name
        target_a = Actor.find_by(name: params[:target_a])
        target_b = Actor.find_by(name: params[:target_b])

        if !target_a 
            results = "Sorry, #{params[:target_a]} is not in our database. Please search for another actor."
        elsif !target_b
            results = "Sorry, #{params[:target_b]} is not in our database. Please search for another actor."
        else
            # call find_link, defined in actor.rb, which returns structured results
            results = Actor.find_link(target_a, target_b)
        # else
        #     # NEED TO HANDLE CASE WHERE ACTORS ARE NOT FOUND
        #     results = 'One of those actors was not found'
        end

        # render results as JSON
        render json: results
    end

end
