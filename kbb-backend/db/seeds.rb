def getData
    Movie.all.destroy_all

    i = 0
    while i <= 20 do
        response = RestClient.get("https://api.themoviedb.org/3/movie/#{i}?api_key=f561f9632b29613ae5d1646d3298a753&language=en-US"){|response, request, result| response }
        json = JSON.parse response

        if !json.nil? && json['original_language'] == 'en'
            Movie.create(
                tmdb_id: json['id'],
                imdb_id: json['imdb_id'],
                title: json['title'],
                poster_path: json['poster_path'],
                release_year: json['release_date'].split('-').first
            )
        end
        i += 1
    end
end

getData()   