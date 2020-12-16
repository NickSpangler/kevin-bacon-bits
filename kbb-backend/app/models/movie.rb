class Movie < ApplicationRecord
    has_many :movie_actors
    has_many :actors, :through => :movie_actors

    scope :find_by_year, -> (query) { where(release_year: query )}

    # write function that returns boolean 'is this actor(id) in this movie'
    # given a movie, is this actor(id) in this list of movie's MovieActors

end
