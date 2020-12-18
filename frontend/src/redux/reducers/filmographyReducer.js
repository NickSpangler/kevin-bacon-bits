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
            return { ...state, actor: action.actor, actor_movies: action.actor_movies }
        case 'INITIALIZE_CURRENT_MOVIE':
            let first_movie = state.actor_movies[Math.floor(Math.random()*state.actor_movies.length)]
            return { ...state, current_movie: first_movie, actor_movies: state.actor_movies.filter( m => m.id !== first_movie.id)}
        case 'GET_POSSIBLE_MOVIES':
            return {...state }
        default:
            return state;
    }
}

export default filmographyReducer;