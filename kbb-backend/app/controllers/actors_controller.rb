class ActorsController < ApplicationController

    def auto_complete
        actors = Actor.limit(10)
        render json: actors
    end
    
end
