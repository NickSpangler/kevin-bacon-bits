function sixDegreesChallengeReducer(state = {
    target_a: 'not selected',
    degree: 1,
    target_b: 'not selected',
    link: [],
    link_result: [],
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
    default:
        return state;
    }
}

export default sixDegreesChallengeReducer;