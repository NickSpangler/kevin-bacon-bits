function sixDegreesChallengeReducer(state = {
    target_a: 'not selected',
    degree: 1,
    target_b: 'not selected',
    first_degree_link: {
        target_a_id: '',
        movie_id: '',
        target_b_id: ''
    },
    first_degree_result: {},
    link_message: '',
    showing_result: false,
    challenge_active: false,
    loading: false
}, action) {

switch(action.type) {
    case 'SET_TARGET_A':
        return { 
            ...state, 
            target_a: action.actor, 
        }    
    case 'SET_DEGREE':
        return {
            ...state,
            degree: action.degree
        }
    case 'TOGGLE_LOADING':
        return {
            ...state,
            loading: !state.loading
        }
    case 'TOGGLE_CHALLENGE_ACTIVE':
        return {
            ...state,
            challenge_active: !state.challenge_active
        }
    case 'SET_TARGET_B':
        return {
            ...state,
            target_b: action.target_b
        }
    case 'RESET_CHALLENGE':
        return {
                target_a: 'not selected',
                degree: 1,
                target_b: 'not selected',
                first_degree_link: {
                    target_a_id: '',
                    movie_id: '',
                    target_b_id: ''},
                first_degree_result: {},
                link_message: '',
                showing_result: false,
                challenge_active: false,
                loading: false
        }
    case 'UPDATE_FIRST_DEGREE_LINK':
        return {
            ...state,
            first_degree_link: action.payload
        }
    default:
        return state;
    }
}

export default sixDegreesChallengeReducer;