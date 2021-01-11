class Movie < ApplicationRecord
    has_many :movie_actors
    has_many :actors, :through => :movie_actors

    scope :find_by_year, -> (query) { where(release_year: query )}
    scope :auto_complete, -> (query) { where("title ILIKE (?)", "%#{query}%" )}

    def self.check_first_degree_answer(target_a_id, movie_id, target_b_id)
        target_a = Actor.find(target_a_id.to_i)
        target_b = Actor.find(target_b_id.to_i)
        movie = Movie.find(movie_id.to_i)
        if movie.actors.include?(target_a) && movie.actors.include?(target_b)
            target_a_chacter = MovieActor.where(movie_id: movie.id, actor_id: target_a.id).first.character
            target_b_chacter = MovieActor.where(movie_id: movie.id, actor_id: target_b.id).first.character
            return {result: true, message: "That's correct! #{target_a.name} played '#{target_a_chacter}' and #{target_b.name} played '#{target_b_chacter}' in #{movie.title}."}
        else
            link = Actor.first_degree_search(target_a, target_b)
            return {result: false, message: "Sorry, that's incorrect. #{link[:target_a][:name]} was actually in #{link[:movie][:title]} with #{link[:target_b][:name]}."}
        end
    end
end
