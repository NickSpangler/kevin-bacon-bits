class ActorsController < ApplicationController

    def auto_complete
        actors = Actor.auto_complete(params[:input]).limit(10)
        render json: actors
    end

    def movie_list
        actor = Actor.auto_complete(params[:input]).limit(1)
        render json: actor, :include => [:movies, :movie_actors]
    end

    def link
        target_a = Actor.find_by(name: params[:target_a])
        target_b = Actor.find_by(name: params[:target_b])

        render json: [target_a, target_b]
    end

end
