import React from 'react'
import silhouette from './silhouette.png'

const TargetBPhoto = (props) => {
    if (props.source !== '') {
        return (
            <img src={`https://image.tmdb.org/t/p/w200${props.source}`} height='100px'></img>
        )
    } else {
        return (
            <img src={silhouette} height='100px'></img>
            )
    }
}

export default TargetBPhoto