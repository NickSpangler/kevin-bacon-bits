function filmographyReducer(state = {
                                actor: {},
                                actor_movies: [],
                                current_movie: {},
                                possible_answers: [],
                                round_result: 'waiting',
                                history: []
                            }, action) {
    switch(action.type) {
        case 'SET_ACTOR':
            return { ...state, actor: action.actor, actor_movies: action.actor_movies }
        default:
            return state;
    }
}

export default filmographyReducer;