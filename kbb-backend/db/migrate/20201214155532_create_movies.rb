class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies do |t|
      t.integer :tmdb_id
      t.string :imdb_id
      t.string :title
      t.string :poster_path
      t.integer :release_year

      t.timestamps
    end
  end
end
