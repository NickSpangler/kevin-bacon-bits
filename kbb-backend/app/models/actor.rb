class Actor < ApplicationRecord
    has_many :movie_actors
    has_many :movies, :through => :movie_actors, counter_cache: true

    # scope :auto_complete, -> (query) { where("name ILIKE (?)", "#{query}%" ).order(:name)}
    scope :auto_complete, -> (query) { where("name ILIKE (?)", "#{query}%" ).order("profile_path = '', name")}

    def self.find_link(target_a, target_b)
        if Actor.check_first_degree(target_a, target_b) != nil
            return Actor.check_first_degree(target_a, target_b)
        else
            Actor.second_degree_search(target_a, target_b)
        end
    end

    def self.get_associated_actors(target)
            Actor.find_by_sql("
            SELECT DISTINCT target_actors.id, target_actors.tmdb_id, target_actors.name, target_actors.profile_path, target_actors.gender, target_actors.created_at, target_actors.updated_at
            FROM
            actors target
            JOIN
            movie_actors target_movies
            ON
            target.id = actor_id
            JOIN
            movies movies
            ON
            movies.id = target_movies.movie_id
            JOIN
            movie_actors rest
            ON
            rest.movie_id = target_movies.movie_id
            JOIN
            actors target_actors
            ON
            target_actors.id = rest.actor_id
            WHERE
            target.id = #{target.id}") - [target]
    end

    def self.get_associated_actors_from_array(array)
        Actor.find_by_sql("
        SELECT DISTINCT target_actors.id, target_actors.tmdb_id, target_actors.name, target_actors.profile_path, target_actors.gender, target_actors.created_at, target_actors.updated_at
        FROM
        actors target
        JOIN
        movie_actors target_movies
        ON
        target.id = actor_id
        JOIN
        movies movies
        ON
        movies.id = target_movies.movie_id
        JOIN
        movie_actors rest
        ON
        rest.movie_id = target_movies.movie_id
        JOIN
        actors target_actors
        ON
        target_actors.id = rest.actor_id
        WHERE
        target.id IN (#{array.join(", ")})") - array
    end

    def self.search_back_one_level(target, array)
        Actor.find_by_sql("
        SELECT DISTINCT actor_b.id, actor_b.tmdb_id, actor_b.name, actor_b.profile_path, actor_b.gender, actor_b.created_at, actor_b.updated_at
        FROM
        movie_actors target_a
        JOIN
        movie_actors target_b
        ON
        target_a.movie_id = target_b.movie_id
        JOIN
        movies movies
        ON
        target_a.movie_id = movies.id
        JOIN
        actors actor_a
        ON
        target_a.actor_id = actor_a.id
        JOIN
        actors actor_b 
        ON
        target_b.actor_id = actor_b.id
        WHERE
        target_a.actor_id = #{target.id} AND target_b.actor_id IN (#{array.join(", ")})")
    end


    # ALWAYS RETURNS AN ARRAY OF ONE OBJECT OF ONE LINK BETWEEN TWO ACTORS -> THIS IS USED TO TEST IF A FIRST-DEGREE LINK EXISTS
    def self.check_first_degree(target_a, target_b)
        # aMovies = target_a.movies
        # bMovies = target_b.movies
        # matches = []
        # aMovies.each{|m| matches << m if bMovies.include?(m)}
        matches = target_a.movies & target_b.movies
        if matches.length > 0
            movie = matches[rand(matches.length)]
            target_a_character = movie.movie_actors.where(actor_id: target_a.id).first.character
            target_b_character = movie.movie_actors.where(actor_id: target_b.id).first.character
            return [{
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
        }]
        end
        return nil
    end

    # ALWAYS RETURNS ONE OBJECT OF ONE LINK BETWEEN TWO ACTORS -> ONLY USED WHEN FIRST DEGREE LINK IS CONFIRMED
    def self.first_degree_search(target_a, target_b)
        # aMovies = target_a.movies
        # bMovies = target_b.movies
        # matches = []
        # aMovies.each{|m| matches << m if bMovies.include?(m)}
        matches = target_a.movies & target_b.movies
        if matches.length > 0
            movie = matches[rand(matches.length)]
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



    
    # RETURNS ARRAY OF MULTIPLE LEVELS OF LINKS, CALLS first_degree_search, ONLY USE AFTER CHECKING FIRST DEGREE CONNECTION
    def self.second_degree_search(target_a, target_b)
        target_c = []
        target_d = []
        results= []
        levels = {
            target_a_actors: [],
            target_c_actors: [],
            target_e_actors: [],
            target_f_actors: [],
            target_d_actors: [],
            target_b_actors: []
        }

        # <----------------# THIS BEGINS THE SECOND-DEGREE SEARCH BRANCH----------->



        
        # put all target_a associated actors in first key of hash
        # target_a.movies.each do |m|
        #     m.actors.each do |a|
        #         levels[:target_a_actors] << a unless a == target_a
        #     end
        # end
        levels[:target_a_actors].concat(Actor.get_associated_actors(target_a))

        # put all target_b associated actors in second key of hash
        # target_b.movies.each do |m|
        #     m.actors.each do |a|
        #         levels[:target_b_actors] << a unless a == target_b
        #     end
        # end
        levels[:target_b_actors].concat(Actor.get_associated_actors(target_b))

        # matching actor is target_c
        # levels[:target_a_actors].each{|a| target_c << a if levels[:target_b_actors].include?(a)}
        # target_c = target_c.first
        target_c = (levels[:target_a_actors] & levels[:target_b_actors]).first

        # checks if target_c has been found. if so, finds first-degree link between A and C, then first-degree link between C and B
        if target_c != nil
            # call first_degree_search on target_a, target_c => shovel into results
            results << Actor.first_degree_search(target_a, target_c)
    
            # call first_degree_search on target_c, target_b => shovel into results
            results << Actor.first_degree_search(target_c, target_b)
        end


        # CHECKS FOR SECOND-DEGREE MATCH, RETURNS RESULT IF TRUE
        if results.length > 0
            return results


        # <----------------THIS ENDS THE SECOND DEGREE SEARCH BRANCH ----------------->





        # <----------------# THIS BEGINS THE THIRD-DEGREE SEARCH BRANCH----------->

        else
            # VERSION ONE
            # GETS ASSOCIATED ACTORS FROM ALL TARGET_A_ACTORS, PUTS THEM IN TARGET_C_ACTORS
            # levels[:target_a_actors].each do |a|
            #     a.movies.each do |m|
            #         m.actors.each do |a2|
            #             levels[:target_c_actors] << a2 unless levels[:target_a_actors].include?(a2)
            #         end
            #     end
            # end

            # VERSION TWO
            # levels[:target_a_actors].each do |a|
            #     levels[:target_c_actors].concat(Actor.get_associated_actors(a))
            # end

            # VERSION THREE
            # SQL QUERY WHICH ACCEPTS ARRAY OF PREVIOUS LEVEL ACTOR IDS AND RETURNS NEXT LEVEL OF ASSOCIATED ACTORS
            levels[:target_c_actors] = Actor.get_associated_actors_from_array(levels[:target_a_actors].map{|a| a.id})



            # levels[:target_b_actors].each{|a| target_d << a if levels[:target_c_actors].include?(a)}
            # target_d = target_d.first
            target_d = (levels[:target_b_actors] & levels[:target_c_actors]).first

            if target_d != nil

                results << Actor.first_degree_search(target_d, target_b)
                
                # VERSION ONE
                # ITERATE THROUGH FOUND TARGETS MOVIES/LOOK AT THEIR CAST LISTS LOOKING FOR ACTORS IN PREVIOUS LEVEL
                # target_d.movies.each do |m|
                #     m.actors.each do |a|
                #         target_c = a if levels[:target_a_actors].include?(a)
                #     end
                # end

                target_c = Actor.search_back_one_level(target_d, levels[:target_a_actors].map{|a| a.id}).first
                # # byebug
                # target_c = target_c.first

                results << Actor.first_degree_search(target_c, target_d)

                results << Actor.first_degree_search(target_a, target_c)

                results = results.reverse
                # byebug
            end

            if results.length > 0
                return results
            else
                return { value: 'Sorry, no link could be found.' }
            end

        end




    end































end
