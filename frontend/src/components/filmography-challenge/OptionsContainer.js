import React from 'react'

const OptionsContainer = (props) => {
    if (props.possible_answers === 'between rounds') {
        return (
            <></>
    )} else {
        return (
            <p>Now there are options.</p>
        )
    }
}

export default OptionsContainer
