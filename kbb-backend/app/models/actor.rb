class Actor < ApplicationRecord
    has_many :movie_actors
    has_many :movies, :through => :movie_actors

    scope :auto_complete, -> (query) { where("name ILIKE (?)", "#{query}%" ).order(:name)}

    def self.find_link(target_a, target_b)
        aMovies = target_a.movies
        bMovies = target_b.movies
        matches = []
        aMovies.each{|m| matches << m if bMovies.include?(m)}
        if matches.length > 0
            movie = matches.first
            target_a_character = movie.movie_actors.where(actor_id: target_a.id).first.character
            target_b_character = movie.movie_actors.where(actor_id: target_b.id).first.character
            return [{
                target_a: {
                    name: target_a.name,
                    profile_path: target_a.profile_path,
                    character: target_a_character},
                target_b: {
                    name: target_b.name,
                    profile_path: target_b.profile_path,
                    character: target_b_character},
                movie: {
                    title: movie.title,
                    poster_path: movie.poster_path
                }
        }]
        end
        return []
    end

end
