class Actor < ApplicationRecord
    has_many :movie_actors
    has_many :movies, :through => :movie_actors

    scope :auto_complete, -> (query) { where("name ILIKE (?)", "#{query}%" ).order(:name)}

    # def self.find_link(target_a, target_b)
    #     aMovies = target_a.movies
    #     bMovies = target_b.movies
    #     matches = []
    #     aMovies.each{|m| matches << m if bMovies.include?(m)}
    #     if matches.length > 0
    #         movie = matches.first
    #         target_a_character = movie.movie_actors.where(actor_id: target_a.id).first.character
    #         target_b_character = movie.movie_actors.where(actor_id: target_b.id).first.character
    #         return [{
    #             target_a: {
    #                 name: target_a.name,
    #                 profile_path: target_a.profile_path,
    #                 character: target_a_character},
    #             movie: {
    #                 title: movie.title,
    #                 poster_path: movie.poster_path
    #                 },
    #             target_b: {
    #                 name: target_b.name,
    #                 profile_path: target_b.profile_path,
    #                 character: target_b_character},
    #     }]
    #     end
    #     return []
    # end



    # <------------------BELOW THIS LINE STILL IN DEVELOPMENT---------------->

    # ALWAYS RETURNS ONE OBJECT OF ONE LINK BETWEEN TWO ACTORS -> ONLY USE WHEN FIRST DEGREE LINK IS CONFIRMED
    def self.first_degree_search(target_a, target_b)
        aMovies = target_a.movies
        bMovies = target_b.movies
        matches = []
        aMovies.each{|m| matches << m if bMovies.include?(m)}
        if matches.length > 0
            movie = matches.first
            target_a_character = movie.movie_actors.where(actor_id: target_a.id).first.character
            target_b_character = movie.movie_actors.where(actor_id: target_b.id).first.character
            return {
                target_a: {
                    name: target_a.name,
                    profile_path: target_a.profile_path,
                    character: target_a_character},
                movie: {
                    title: movie.title,
                    poster_path: movie.poster_path
                    },
                target_b: {
                    name: target_b.name,
                    profile_path: target_b.profile_path,
                    character: target_b_character},
        }
        end
    end



    # RETURNS ARRAY OF TWO LEVELS OF LINKS, CALLS first_degree_search, ONLY USE AFTER CHECKING FIRST DEGREE CONNECTION
    def self.find_link(target_a, target_b)
        target_c = []
        results= []
        levels = {
            target_a_actors: [],
            target_c_actors: [],
            target_e_actors: [],
            target_f_actors: [],
            target_d_actors: [],
            target_b_actors: []
        }
        
        # put all target_a associated actors in first key of hash
        target_a.movies.each do |m|
            m.actors.each do |a|
                levels[:target_a_actors] << a
            end
        end
        # put all target_b associated actors in second key of hash
        target_b.movies.each do |m|
            m.actors.each do |a|
                levels[:target_b_actors] << a
            end
        end

        # matching actor is target_c
        levels[:target_a_actors].each{|a| target_c << a if levels[:target_b_actors].include?(a)}
        target_c = target_c.first

        # call first_degree_search on target_a, target_c => shovel into results
        results << Actor.first_degree_search(target_a, target_c)

        # call first_degree_search on target_c, target_b => shovel into results
        results << Actor.first_degree_search(target_c, target_b)
        # return results 
        return results
    end































end
