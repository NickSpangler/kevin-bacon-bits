export const setActor = (selectedActor) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/actors/movie_list?input=${selectedActor}`)
        .then(res => res.json())
        .then(data => {
            dispatch({type: 'SET_ACTOR', actor: data[0], actor_movies: data[0].movies })
        })
    };
};

export const initializeCurrentMovie = () => {
    return ({
        type: 'INITIALIZE_CURRENT_MOVIE'
    })
}

export const getPossibleMovies = (currentMovieYear, actor_id) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/movies/possible_movies?year=${currentMovieYear}&actor_id=${actor_id}`)
        .then(resp => resp.json())
        .then(movies => {
            dispatch({type: 'GET_POSSIBLE_MOVIES', movies: movies })
        })
    }
}