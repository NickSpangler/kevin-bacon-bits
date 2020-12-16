class ActorsController < ApplicationController

    def auto_complete
        actors = Actor.auto_complete(params[:input]).limit(10)
        render json: actors
    end

end
