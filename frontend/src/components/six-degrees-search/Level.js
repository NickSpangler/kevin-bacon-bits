import React from 'react'

export default function Level(props) {
    return (
        <div>
            <p>{`${props.data.target_a.name} played ${props.data.target_a.character} in ${props.data.movie.title} with ${props.data.target_b.name} as ${props.data.target_b.character}`}</p>
        </div>
    )
}
