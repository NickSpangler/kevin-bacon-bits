import React from 'react'

const RoundResult = (props) => {

    if (props.round_result === false) {
        return (
            <>
                NOPE! YOU GOT IT WRONG, DUMMY!
            </>
        )
    } else if (props.round_result === true) {
        return (
            <>
                YAY! YOU GOT IT RIGHT!
            </>
        )
    } else {
        return (
            <></>
        )
    }
}

export default RoundResult
