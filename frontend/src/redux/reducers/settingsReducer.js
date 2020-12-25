function settingsReducer(state = { sound: true }, action) {
    switch(action.type) {
        case 'TOGGLE_SOUND':
            return { ...state, sound: !state.sound };
        default:
            return state;
    }
}

export default settingsReducer