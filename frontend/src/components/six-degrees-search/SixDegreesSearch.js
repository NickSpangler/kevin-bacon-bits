import React from 'react'
import TargetAInput from './TargetAInput'
import TargetBInput from './TargetBInput'
import SearchResults from './SearchResults'

export default function SixDegreesSearch() {
    return (
        <div>
            <h1>Search for the link between two actors:</h1>
            <TargetAInput />
            <br/><br/>
            <TargetBInput />
            <br/><br/>
            <SearchResults />
        </div>
    )
}