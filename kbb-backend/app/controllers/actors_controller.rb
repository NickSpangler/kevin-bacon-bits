class ActorsController < ApplicationController

    def auto_complete
        actors = Actor.auto_complete(params[:auto_complete]).limit(10)
        render json: actors
    end

end
