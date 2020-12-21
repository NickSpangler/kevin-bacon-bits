function filmographyReducer(state = {
                                actor: 'not selected',
                                actor_movies: [],
                                current_movie: {},
                                possible_answers: [],
                                round_result: 'waiting',
                                history: [],
                                challenge_active: false,
                                total_history: 0
                            }, action) {
    switch(action.type) {
        case 'SET_ACTOR':
            let first_movie = action.actor_movies[Math.floor(Math.random()*action.actor_movies.length)]
            return { 
                ...state, 
                actor: action.actor, 
                actor_movies: action.actor_movies, 
                current_movie: first_movie }
        case 'GET_POSSIBLE_MOVIES':
            let index = Math.floor(Math.random()*4)
            let movies = action.movies
            movies.splice(index, 0, state.current_movie)
            return {
                ...state, 
                possible_answers: movies,
                actor_movies: state.actor_movies.filter(m => m.id !== state.current_movie.id),
                challenge_active: true,
                round_result: 'waiting'
            }
        case 'SELECT_NEW_ACTOR':
            return {
                actor: 'not selected',
                actor_movies: [],
                current_movie: {},
                possible_answers: [],
                round_result: 'waiting',
                history: [],
                challenge_active: false,
                total_history: state.total_history
            }
        case 'RIGHT_ANSWER':
            console.log(action)
            let next_movie = state.actor_movies[Math.floor(Math.random()*state.actor_movies.length)]
            let new_total = state.total_history + 1
            return {
                ...state,
                history: [...state.history, state.current_movie],
                current_movie: next_movie,
                round_result: true,
                possible_answers: [],
                total_history: new_total
            }
        case 'WRONG_ANSWER':
            return {
                ...state,
                actor_movies: [...state.actor_movies, state.current_movie, ...state.history],
                round_result: false,
                possible_answers: []
            }
        case 'TRY_AGAIN':
            let new_first_movie = state.actor_movies[Math.floor(Math.random()*state.actor_movies.length)]
            return {
                ...state,
                current_movie: new_first_movie,
                // actor_movies: [...state.actor_movies, state.current_movie, ...state.history],
                possible_answers: [],
                round_result: 'waiting',
                history: [],
                challenge_active: false
            }
        default:
            return state;
    }
}

export default filmographyReducer;