export const setActor = (selectedActor) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/actors/movie_list?input=${selectedActor}`)
        .then(res => res.json())
        .then(data => {
            dispatch({type: 'SET_ACTOR', actor: data, actor_movies: data.movies })
        })
    };
};

export const getPossibleMovies = (currentMovieId, actor_id, whoosh, sound) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/movies/possible_movies?current_movie=${currentMovieId}&actor_id=${actor_id}`)
        .then(resp => resp.json())
        .then(movies => {
            dispatch({type: 'GET_POSSIBLE_MOVIES', movies: movies });
            if (sound === true) whoosh();
        })
    }
}

export const selectNewActor = () => {
    return (
        {
            type: 'SELECT_NEW_ACTOR'
        }
    )
}

export const rightAnswer = () => {
    return (
        {
            type: 'RIGHT_ANSWER'
        }
    )
}

export const wrongAnswer = () => {
    return (
        {
            type: 'WRONG_ANSWER'
        }
    )
}

export const tryAgain = () => {
    return (
        {
            type: 'TRY_AGAIN'
        }
    )
}