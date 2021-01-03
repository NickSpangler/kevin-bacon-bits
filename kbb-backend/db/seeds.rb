def getData

    i = 651103
    while i <= 700000 do
        response = RestClient.get("https://api.themoviedb.org/3/movie/#{i}?api_key=f561f9632b29613ae5d1646d3298a753&language=en-US"){|response, request, result| response }
        if response.code == 200
            json = JSON.parse response
            if json['original_language'] == 'en' && json['adult'] == false && json['poster_path'] != nil && json['poster_path'] != ""
                movie = Movie.create(
                    tmdb_id: json['id'],
                    imdb_id: json['imdb_id'],
                    title: json['title'],
                    poster_path: json['poster_path'],
                    release_year: json['release_date'].split('-').first
                )
                                    
                castResponse = RestClient.get("https://api.themoviedb.org/3/movie/#{i}/credits?api_key=f561f9632b29613ae5d1646d3298a753&language=en-US")
                castJson = JSON.parse castResponse
                castJson['cast'].map do |person|
                    if actor = Actor.find_by(tmdb_id: person['id'])
                        MovieActor.create(movie_id: movie.id, actor_id: actor.id, character: person['character'])
                    else
                        actor = Actor.create(
                            tmdb_id: person['id'],
                            name: person['name'],
                            profile_path: person['profile_path'],
                            gender: person['gender']
                        )
                        MovieActor.create(movie_id: movie.id, actor_id: actor.id, character: person['character'])
                    end
                end
            end
            puts "#{json['id']}. #{json['title']}"
        else
            puts response.code
        end
        i += 1
    end
end

getData()   