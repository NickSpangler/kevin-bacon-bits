export const setTargetA = (actor_id) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/actors/movie_list?input=${actor_id}`)
        .then(res => res.json())
        .then(data => {
            dispatch({type: 'SET_TARGET_A', actor: data })
        })
    };
}

export const setDegree = (degree) => {
    return (
        {
            type: 'SET_DEGREE', degree: degree
        }
    )
}

export const startChallenge = (actor_id, degree) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/actors/start_SDChallenge?actor_id=${actor_id}&degree=${degree}`)
        .then(res => res.json())
        .then(data => {
            debugger
        })
    }
}