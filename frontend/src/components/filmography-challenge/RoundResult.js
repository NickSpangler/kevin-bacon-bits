import React from 'react'
import { Result, Button } from 'antd'

const RoundResult = (props) => {

    const gender = props.actor.gender === 1 ? ('her') : ('his')
    const gender2 = props.actor.gender === 1 ? ('She') : ('He')
    if (props.round_result === false) {
        return (
            <div className='bounce-in-bottom'>
            <Result
                status="error"
                title={`Sorry, ${props.actor.name} was not in that movie.`}
                subTitle={`${gender2} was actually in ${props.current_movie.title}.`}
                extra={[
                <Button type="primary" key="start_challenge" onClick={props.selectNewActor}>
                    Start A New Challenge
                </Button>,
                <Button key="try_again" onClick={props.tryAgain}>Try Again With {props.actor.name.split(' ')[0]}</Button>,
                ]}
            >
            </Result>
            </div>
        )
    } else if (props.round_result === true && props.actor_movies.length === 0) {
        return (
            <div className='bounce-in-bottom'>
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
            </div>
        )
    } else if (props.round_result === true) {
        return (
            <div className='bounce-in-bottom'>
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
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}

export default RoundResult