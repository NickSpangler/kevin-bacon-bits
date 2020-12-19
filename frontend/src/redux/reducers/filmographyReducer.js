function filmographyReducer(state = {
                                actor: 'not selected',
                                actor_movies: [],
                                current_movie: {},
                                possible_answers: [],
                                round_result: 'waiting',
                                history: []
                            }, action) {
    switch(action.type) {
        case 'SET_ACTOR':
            let first_movie = action.actor_movies[Math.floor(Math.random()*state.actor_movies.length)]
            return { ...state, actor: action.actor, actor_movies: action.actor_movies, current_movie: first_movie }
        case 'GET_POSSIBLE_MOVIES':
            let index = Math.floor(Math.random()*4)
            let movies = action.movies
            movies.splice(index, 0, state.current_movie)
            return {
                ...state, 
                possible_answers: movies,
                actor_movies: state.actor_movies.filter(m => m.id !== state.current_movie.id)}
        default:
            return state;
    }
}

export default filmographyReducer;