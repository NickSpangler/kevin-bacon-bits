import React from 'react'
import silhouette from './silhouette.png'

const TargetBPhoto = (props) => {
    if (props.source === '') {
        return (
            <img src={silhouette} height='100px'></img>
        )
    } else if (props.source === 'No image available') {
        return (
            <>
            <img src={silhouette} height='100px'></img>
            <p>No image available</p>
            </>
            )
    } 
    else {
        return (
            <img src={`https://image.tmdb.org/t/p/w200${props.source}`} alt={silhouette} height='100px'></img>
            )
    }
}

export default TargetBPhoto