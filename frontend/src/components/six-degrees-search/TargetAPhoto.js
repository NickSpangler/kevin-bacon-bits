import React from 'react'

const TargetAPhoto = (props) => {
    if (props.source !== '') {
        return (
            <img src={`https://image.tmdb.org/t/p/w200${props.source}`} ></img>
        )
    } else {
        return (<></>)
    }
}

export default TargetAPhoto