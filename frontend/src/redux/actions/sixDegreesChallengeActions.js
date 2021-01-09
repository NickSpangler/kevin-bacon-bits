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
        dispatch({type: 'TOGGLE_LOADING'})
        fetch(`http://localhost:3000/actors/start_SDChallenge?actor_id=${actor_id}&degree=${degree}`)
        .then(res => res.json())
        .then(data => {
            dispatch({type: 'SET_TARGET_B', target_b: data.target_b})
            dispatch({type: 'TOGGLE_LOADING'})
            dispatch({type: 'TOGGLE_CHALLENGE_ACTIVE'})
        })
    }
}

export const resetChallenge = () => {
    return (
        {
            type: 'RESET_CHALLENGE'
        }
    )
}

export const updateFirstDegreeLink = (target_a_id, movie_id, target_b_id) => {
    return (
        {
            type: 'UPDATE_FIRST_DEGREE_LINK', payload: {
                target_a_id: target_a_id,
                movie_id: movie_id,
                target_b_id: target_b_id
            }
        }
    )
}

export const checkAnswer = (degree, first_degree_link) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/movies/check_answer?degree=${degree}&first_degree_target_a=${first_degree_link.target_a_id}&first_degree_target_b=${first_degree_link.target_b_id}&first_degree_movie=${first_degree_link.movie_id}`)
        .then(res => res.json())
        .then(data => {
            dispatch({type: 'UPDATE_FIRST_DEGREE_RESULT', payload: data})
        })
    }   
}