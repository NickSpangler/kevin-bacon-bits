import React from 'react'
import { Result, Button } from 'antd'

const RoundResult = (props) => {

    if (props.round_result === false) {
        return (
            <>
                NOPE! YOU GOT IT WRONG, DUMMY!
            </>
        )
    } else if (props.round_result === true) {
        return (
            <Result
                status="success"
                title={`Correct! ${props.actor.name} was in ${props.history[props.history.length -1].title}`}
                subTitle="Ready for another round?"
                extra={[
                <Button 
                    type="primary"
                    onClick={() => props.getPossibleMovies(props.current_movie.id, props.actor.id)}>
                    Next Round
                </Button>,
                ]}
            />
        )
    } else {
        return (
            <></>
        )
    }
}

export default RoundResult