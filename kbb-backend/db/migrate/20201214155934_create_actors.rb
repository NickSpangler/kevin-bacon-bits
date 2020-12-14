class CreateActors < ActiveRecord::Migration[6.0]
  def change
    create_table :actors do |t|
      t.integer :tmdb_id
      t.string :name
      t.string :profile_path
      t.integer :gender

      t.timestamps
    end
  end
end
