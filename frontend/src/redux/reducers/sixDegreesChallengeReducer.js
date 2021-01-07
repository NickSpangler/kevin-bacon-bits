function sixDegreesChallengeReducer(state = {
    target_a: 'not selected',
    target_b: 'not selected',
    link: [],
    link_result: [],
    link_message: '',
    showing_result: false,
    challenge_active: false,
}, action) {

switch(action.type) {
    case 'SET_TARGET_A':
        return { 
            ...state, 
            target_a: action.actor, 
            }    
    default:
        return state;
    }
}

export default sixDegreesChallengeReducer;