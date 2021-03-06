class Actor < ApplicationRecord
    has_many :movie_actors
    has_many :movies, :through => :movie_actors

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
        target.id IN (#{array.join(", ")})")
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

        levels[:target_a_actors].concat(Actor.get_associated_actors(target_a))

        # put all target_b associated actors in second key of hash
        levels[:target_b_actors].concat(Actor.get_associated_actors(target_b))

        # matching actor is target_c
        target_c = (levels[:target_a_actors] & levels[:target_b_actors]).sample

        # checks if target_c has been found. if so, finds first-degree link between A and C, then first-degree link between C and B
        if target_c != nil
            # call first_degree_search on target_a, target_c THEN target_c, target_b => shovel into results
            results << Actor.first_degree_search(target_a, target_c)
            results << Actor.first_degree_search(target_c, target_b)
        end

        # CHECKS FOR SECOND-DEGREE MATCH, RETURNS RESULT IF TRUE
        if results.length > 0
            return results

        # <----------------THIS ENDS THE SECOND DEGREE SEARCH BRANCH ----------------->

        # <----------------# THIS BEGINS THE THIRD-DEGREE SEARCH BRANCH----------->

        else
            # CHECK IF EITHER TARGET HAS ZERO CONNECTIONS, RETURN MESSAGE IF SO
            if levels[:target_a_actors].length == 0
                return { value: "Sorry, #{target_a.name} is not connected to any other actors."}
            end
            if levels[:target_b_actors].length == 0
                return { value: "Sorry, #{target_b.name} is not connected to any other actors."}
            end

            # SQL QUERY WHICH ACCEPTS ARRAY OF PREVIOUS LEVEL ACTOR IDS AND RETURNS NEXT LEVEL OF ASSOCIATED ACTORS, also subtracting previous level of actors
            levels[:target_c_actors] = Actor.get_associated_actors_from_array(levels[:target_a_actors].map{|a| a.id}) - levels[:target_a_actors] - [target_a]
            
            target_d = (levels[:target_b_actors] & levels[:target_c_actors]).sample

            if target_d != nil
 
                results << Actor.first_degree_search(target_d, target_b)

                # SQL QUERY WHICH ACCEPTS CURRENT TARGET AND ARRAY OF PREVIOUS LEVEL ACTORS AND RETURNS PREVIOUS TARGET
                target_c = Actor.search_back_one_level(target_d, levels[:target_a_actors].map{|a| a.id}).sample

                results << Actor.first_degree_search(target_c, target_d)
                results << Actor.first_degree_search(target_a, target_c)
                # REVERSES RESULTS, BECAUSE LINK HAS BEEN BUILT BACKWARDS
                results = results.reverse
            end

            if results.length > 0
                return results
        # <----------------THIS ENDS THE THIRD DEGREE SEARCH BRANCH ----------------->

        # <----------------# THIS BEGINS THE FOURTH-DEGREE SEARCH BRANCH----------->
            else
                levels[:target_d_actors] = Actor.get_associated_actors_from_array(levels[:target_b_actors].map{|a| a.id}) - levels[:target_b_actors] - [target_b]

                target_e = (levels[:target_c_actors] & levels[:target_d_actors]).sample

                if target_e != nil

                    target_d = Actor.search_back_one_level(target_e, levels[:target_b_actors].map{|a| a.id}).sample
                    results << Actor.first_degree_search(target_e, target_d)
                    results << Actor.first_degree_search(target_d, target_b)

                    results = results.reverse

                    target_c = Actor.search_back_one_level(target_e, levels[:target_a_actors].map{|a| a.id}).sample
                    results << Actor.first_degree_search(target_c, target_e)
                    results << Actor.first_degree_search(target_a, target_c)

                    results = results.reverse
                end

                if results.length > 0
                    return results
        # <----------------THIS ENDS THE FOURTH-DEGREE SEARCH BRANCH ----------------->

        # <----------------# THIS BEGINS THE FIFTH-DEGREE SEARCH BRANCH----------->
                else
                    levels[:target_e_actors] = Actor.get_associated_actors_from_array(levels[:target_c_actors].map{|a| a.id}) - levels[:target_c_actors] - levels[:target_a_actors] - [target_a]
                    target_f = (levels[:target_e_actors] & levels[:target_d_actors]).sample

                    if target_f != nil
                        target_d = Actor.search_back_one_level(target_f, levels[:target_b_actors].map{|a| a.id}).sample
                        results << Actor.first_degree_search(target_f, target_d)
                        results << Actor.first_degree_search(target_d, target_b)

                        results = results.reverse

                        target_e = Actor.search_back_one_level(target_f, levels[:target_c_actors].map{|a| a.id}).sample
                        results << Actor.first_degree_search(target_e, target_f)

                        target_c = Actor.search_back_one_level(target_e, levels[:target_a_actors].map{|a| a.id}).sample
                        results << Actor.first_degree_search(target_c, target_e)
                        results << Actor.first_degree_search(target_a, target_c)

                        results = results.reverse
                    end

                    if results.length > 0
                        return results
        # <----------------THIS ENDS THE FIFTH-DEGREE SEARCH BRANCH ----------------->

        # <----------------# THIS BEGINS THE SIXTH-DEGREE SEARCH BRANCH----------->
                    else
                        levels[:target_f_actors] = Actor.get_associated_actors_from_array(levels[:target_d_actors].map{|a| a.id}) - levels[:target_d_actors] - levels[:target_b_actors] - [target_b]
                        target_g = (levels[:target_e_actors] & levels[:target_f_actors]).sample

                        if target_g != nil
                            target_f = Actor.search_back_one_level(target_g, levels[:target_d_actors].map{|a| a.id}).sample
                            results << Actor.first_degree_search(target_g, target_f)

                            target_d = Actor.search_back_one_level(target_f, levels[:target_b_actors].map{|a| a.id}).sample
                            results << Actor.first_degree_search(target_f, target_d)
                            results << Actor.first_degree_search(target_d, target_b)

                            results = results.reverse

                            target_e = Actor.search_back_one_level(target_g, levels[:target_c_actors].map{|a| a.id}).sample
                            results << Actor.first_degree_search(target_e, target_g)

                            target_c = Actor.search_back_one_level(target_e, levels[:target_a_actors].map{|a| a.id}).sample
                            results << Actor.first_degree_search(target_c, target_e)
                            results << Actor.first_degree_search(target_a, target_c)

                            results = results.reverse
                        end

                        if results.length > 0
                            return results
                        else
                            return { value: 'Sorry, no link could be found within six degrees!' }
                        end
                    end
                end
            end
        end
    end
        # <----------------THIS ENDS SEARCH FUNCTIONS ----------------->

        # <----------------# THIS BEGINS CHALLENGE FUNCTIONS----------->

    
    def self.get_top_N(target, num)
        (Actor.find_by_sql("
        SELECT DISTINCT target_actors.id, target_actors.tmdb_id, target_actors.name, target_actors.profile_path, target_actors.gender, target_actors.created_at, target_actors.updated_at,target_actors.movie_actors_count
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
        target.id = #{target.id}
        ORDER BY
        target_actors.movie_actors_count DESC") - [target])[0...num]
    end

    def self.get_sorted_associated_actors(target)
        Actor.find_by_sql("
        SELECT DISTINCT target_actors.id, target_actors.tmdb_id, target_actors.name, target_actors.profile_path, target_actors.gender, target_actors.created_at, target_actors.updated_at, target_actors.movie_actors_count
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
        target.id = #{target.id}
        ORDER BY
        target_actors.movie_actors_count DESC") - [target]
    end

    def self.get_sorted_associated_actors_from_array(array)
        Actor.find_by_sql("
        SELECT DISTINCT target_actors.id, target_actors.tmdb_id, target_actors.name, target_actors.profile_path, target_actors.gender, target_actors.created_at, target_actors.updated_at, target_actors.movie_actors_count
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
        target.id IN (#{array.join(", ")})
        ORDER BY
        target_actors.movie_actors_count DESC")
    end
        
        def self.start_SDChallenge(target_a, degree)
            if degree.to_i == 1
                target_b = Actor.get_top_N(target_a, 100).sample
            elsif degree.to_i == 2
                first_level = Actor.get_associated_actors(target_a)
                first_link = Actor.get_top_N(target_a, 5).sample
                uniq_second_level = (Actor.get_sorted_associated_actors(first_link) - first_level - [target_a])
                target_b = uniq_second_level[0...5].sample
            elsif degree.to_i == 3
                first_level = Actor.get_associated_actors(target_a)
                second_level = Actor.get_associated_actors_from_array(first_level.map{|a| a.id})
                first_link = Actor.get_top_N(target_a, 5).sample
                uniq_second_level = (Actor.get_sorted_associated_actors(first_link) - first_level - [target_a])
                second_link = uniq_second_level[0...5].sample
                uniq_third_level = (Actor.get_sorted_associated_actors(second_link) - second_level - first_level - [target_a])
                target_b = uniq_third_level[0...3].sample
            end
            return {
                target_a: target_a,
                target_b: target_b
            }
        end
        
        def self.get_first(target)
            first = Actor.get_associated_actors(target)
        end

        def self.get_second(target)
            first = Actor.get_associated_actors(target)
            second = Actor.get_associated_actors_from_array(first.map{|a| a.id}) - first - [target]
        end

        def self.get_third(target)
            first = Actor.get_associated_actors(target)
            second = Actor.get_associated_actors_from_array(first.map{|a| a.id}) - first - [target]
            third = Actor.get_associated_actors_from_array(second.map{|a| a.id}) - second - first - [target]
        end





















end
