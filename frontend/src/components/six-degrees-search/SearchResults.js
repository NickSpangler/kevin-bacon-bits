import React from 'react'
import Level from './Level'

export default function SearchResults(props) {
    if (props.loading === true) {
        return (
            <div>
                <p>Searching for link...</p>
            </div>
        )

    } else {
        return (
            <div>
                {props.results.map( level => <Level data={level} />)}
            </div>
        )
    }
}
