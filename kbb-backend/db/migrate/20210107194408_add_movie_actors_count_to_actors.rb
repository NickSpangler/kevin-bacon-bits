class AddMovieActorsCountToActors < ActiveRecord::Migration[6.0]
  def change
    add_column :actors, :movie_actors_count, :integer
  end
end
