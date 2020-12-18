export const setActor = (selectedActor) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/actors/movie_list?input=${selectedActor}`)
        .then(res => res.json())
        .then(data => {
            dispatch({type: 'UPDATE_RESULTS', actor: data.first, actor_movies: data.first.movies })
        })
    };
};