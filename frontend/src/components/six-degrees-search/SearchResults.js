import React from 'react'
import Level from './Level'

export default function SearchResults(props) {
    return (
        <div>
            {props.results.map( level => <Level data={level} />)}
        </div>
    )
}
