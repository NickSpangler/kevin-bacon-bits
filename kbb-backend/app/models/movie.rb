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
            return {result: false, 
                    message: "Sorry, that's incorrect. #{link[:target_a][:name]} was actually in #{link[:movie][:title]} with #{link[:target_b][:name]}.",
                    results: [link]
                    }
        end
    end

    def self.check_second_degree_answer(target_a_id, movie_one_id, target_c_id, movie_two_id, target_b_id)
        payload = {}
        target_a = Actor.find(target_a_id.to_i)
        movie_one = Movie.find(movie_one_id.to_i)
        target_c = Actor.find(target_c_id.to_i)
        movie_two = Movie.find(movie_two_id.to_i)
        target_b = Actor.find(target_b_id.to_i)
        true_link = Actor.find_link(target_a, target_b)

        if movie_one.actors.include?(target_c)
            target_a_chacter = MovieActor.where(movie_id: movie_one.id, actor_id: target_a.id).first.character
            target_c_chacter1 = MovieActor.where(movie_id: movie_one.id, actor_id: target_c.id).first.character
            payload[:first_degree_result] = {
                result: true, 
                message: "That's correct! #{target_a.name} played '#{target_a_chacter}' and #{target_c.name} played '#{target_c_chacter1}' in #{movie_one.title}."
            }
        else
            payload[:first_degree_result] = {
                result: false, 
                message: "Sorry, that's incorrect. #{target_c.name} was not in #{movie_one.title}. See the correct link below!",
            }
        end

        if movie_two.actors.include?(target_c)
            target_c_chacter2 = MovieActor.where(movie_id: movie_two.id, actor_id: target_c.id).first.character
            target_b_chacter = MovieActor.where(movie_id: movie_two.id, actor_id: target_b.id).first.character
            payload[:second_degree_result] = {
                result: true, 
                message: "That's correct! #{target_c.name} played '#{target_c_chacter2}' and #{target_b.name} played '#{target_b_chacter}' in #{movie_two.title}.",
                results: true_link
            }
        else
            payload[:second_degree_result] = {
                result: false, 
                message: "Sorry, that's incorrect. #{target_c.name} was not in #{movie_two.title}. See the correct link below!",
                results: true_link
            }
        end
        return payload
    end

end
