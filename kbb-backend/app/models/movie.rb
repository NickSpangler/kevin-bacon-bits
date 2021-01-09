class Movie < ApplicationRecord
    has_many :movie_actors
    has_many :actors, :through => :movie_actors

    scope :find_by_year, -> (query) { where(release_year: query )}
    scope :auto_complete, -> (query) { where("title ILIKE (?)", "#{query}%" )}

    def self.check_first_degree_answer(target_a_id, movie_id, target_b_id)
        target_a = Actor.find(target_a_id.to_i)
        target_b = Actor.find(target_b_id.to_i)
        movie = Movie.find(movie_id.to_i)
        if movie.actors.include?(target_a) && movie.actors.include?(target_b)
            return {result: true, message: 'Yay! You are correct!'}
        else
            return {result: false, message: 'Oh, snap! You got it wrong!'}
        end
    end
end
