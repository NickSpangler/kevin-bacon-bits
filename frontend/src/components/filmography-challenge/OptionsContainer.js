import React from 'react'

const OptionsContainer = (props) => {
    if (props.possible_answers === 'between rounds') {
        return (
            <div>
                <p>No options yet.</p>
            </div>
    )} else {
        return (
            <p>Now there are options.</p>
        )
    }
}

export default OptionsContainer
