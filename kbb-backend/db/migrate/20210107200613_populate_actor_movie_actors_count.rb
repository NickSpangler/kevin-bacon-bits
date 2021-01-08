class PopulateActorMovieActorsCount < ActiveRecord::Migration[6.0]
  def change
    Actor.find_each do |actor|
      Actor.reset_counters(actor.id, :movie_actors)
    end
  end
end
