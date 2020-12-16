class ActorsController < ApplicationController

    def auto_complete

        @shows = Show.search(params[:search])


        actors = Actor.limit(10)
        render json: actors
    end

end
