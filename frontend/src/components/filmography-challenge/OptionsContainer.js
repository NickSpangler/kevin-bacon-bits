import React from 'react'

const OptionsContainer = (props) => {
    if (props.possible_answers === 'between rounds') {
        return (
            <></>
    )} else {
        return (
            <>
            {props.possible_answers.map( option => <img src={`https://image.tmdb.org/t/p/w200${option.poster_path}`}></img>)}
            </>
        )
    }
}

export default OptionsContainer
