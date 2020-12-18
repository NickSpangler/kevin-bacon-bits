export const setActor = (selectedActor) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/actors/movie_list?input=${selectedActor}`)
        .then(res => res.json())
        .then(data => {
            dispatch({type: 'SET_ACTOR', actor: data[0], actor_movies: data[0].movies })
        })
    };
};