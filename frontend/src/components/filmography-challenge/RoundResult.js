import React from 'react'
import { Result, Button } from 'antd'

const RoundResult = (props) => {

    const gender = props.actor.gender === 1 ? ('her') : ('his')
    if (props.round_result === false) {
        return (
            <>
                NOPE! YOU GOT IT WRONG, DUMMY!
            </>
        )
    } else if (props.round_result === true && props.actor_movies.length === 0) {
        return (
            <Result
                status="success"
                title={`Correct! ${props.actor.name} was in ${props.history[props.history.length -1].title}.`}
                subTitle={`And that's ${gender} entire filmography! You really know ${gender} career!`}
                extra={[
                <Button 
                    type="primary"
                    onClick={props.selectNewActor}>
                    Start A New Challenge
                </Button>,
                ]}
            />
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