export const getResults = (target_a, target_b) => {
    return (dispatch) => {
        dispatch(toggleLoading())

        fetch(`http://localhost:3000/actors/search_for_link?target_a=${target_a}&target_b=${target_b}`)
        .then(res => res.json())
        .then(data => {
            dispatch({type: 'UPDATE_RESULTS', payload: data})
            dispatch(toggleLoading())
        })
    };
};

export const updateTargetA = (name) => {
    return ({
        type: 'UPDATE_TARGET_A',
        payload: name
    })
}

export const updateTargetB = (name) => {
    return ({
        type: 'UPDATE_TARGET_B',
        payload: name
    })
}

export const toggleLoading = () => {
    return ({
        type: 'TOGGLE_LOADING',
    })
}