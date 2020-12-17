export const getResults = () => {
    return (dispatch) => {
        fetch('http://localhost:3000/search_for_link')
        .then(res => res.json())
        .then(data => {
            dispatch({type: 'UPDATE_RESULTS', payload: data})
        })
    };
};

export const updateTargetA = (name) => {
    return ({
        type: 'UPDATE_TARGET_A',
        payload: name
    })
}