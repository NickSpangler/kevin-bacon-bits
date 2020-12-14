class CreateMovieActors < ActiveRecord::Migration[6.0]
  def change
    create_table :movie_actors do |t|
      t.integer :movie_id
      t.integer :actor_id
      t.string :character

      t.timestamps
    end
  end
end
