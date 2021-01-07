export const setTargetA = (actor_id) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/actors/movie_list?input=${actor_id}`)
        .then(res => res.json())
        .then(data => {
            dispatch({type: 'SET_TARGET_A', actor: data })
        })
    };
}