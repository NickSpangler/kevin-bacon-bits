function searchReducer(state = { target_A: '', target_B: '', results: [], loading: false }, action) {
    switch(action.type) {
        case 'UPDATE_TARGET_A':
            return { ...state, target_A: action.payload };
        case 'UPDATE_TARGET_B':
            return { ...state, target_B: action.payload };
        case 'UPDATE_RESULTS':
            return {...state, results: action.payload };
        case 'TOGGLE_LOADING':
            return {...state, loading: !state.loading };
        default:
            return state;
    }
}

export default searchReducer