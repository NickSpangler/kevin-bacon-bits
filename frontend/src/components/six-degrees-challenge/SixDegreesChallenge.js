import React from 'react';
import { Button, Space } from 'antd';
import StartingPoint from './StartingPoint';
import SelectDegree from './SelectDegree';
import { connect } from 'react-redux';
import { setTargetA, setDegree, startChallenge, resetChallenge, updateFirstDegreeLink, checkAnswer, checkAnswer2, checkAnswer3, tryAgain } from '../../redux/actions/sixDegreesChallengeActions'
import Loading from './Loading'
import ChallengeOptionsContainer from './ChallengeOptionsContainer'

function SixDegreesChallenge(props) {

    const challengeButton = props.target_a === 'not selected' || props.loading === true || props.challenge_active === true ? (<></>) : (<Button type='primary' onClick={() => props.startChallenge(props.target_a.id, props.degree)}>Challenge Me!</Button>)
    const tryAgainButton = props.showing_result === true ? (<Button type='primary' onClick={props.tryAgain} >{`Try again with ${props.target_a.name}`}</Button>) : (<></>)
    return (
        <>
        <div className='challenge-container'>
        <div className='challenge-content'>
            <h1 style={{color: 'white'}}>Build the link between two actors:</h1>
            <div className='slide-in-bottom'>
                <StartingPoint setTargetA={props.setTargetA} challenge_active={props.challenge_active} resetChallenge={props.resetChallenge} />
            </div>
            <div className='slide-in-top'>
                <br></br>
                <SelectDegree setDegree={props.setDegree} loading={props.loading} challenge_active={props.challenge_active} />
            </div>
            <Loading loading={props.loading} />
            <ChallengeOptionsContainer 
            degree={props.degree} 
            target_a={props.target_a} 
            target_b={props.target_b} 
            first_degree_link={props.first_degree_link} 
            second_degree_link={props.second_degree_link}
            updateFirstDegreeLink={props.updateFirstDegreeLink} 
            checkAnswer={props.checkAnswer} 
            checkAnswer2={props.checkAnswer2} 
            checkAnswer3={props.checkAnswer3} 
            showing_result={props.showing_result} 
            first_degree_result={props.first_degree_result} 
            second_degree_result={props.second_degree_result} 
            loading={props.loading}/>
            <br></br>
            {challengeButton}
            {tryAgainButton}
        </div>
        </div>
        </>
    )
}

const mapStateToProps = ({ sixDegreesChallenge, settings }) => {
    return {
        target_a: sixDegreesChallenge.target_a,
        degree: sixDegreesChallenge.degree,
        target_b: sixDegreesChallenge.target_b,
        first_degree_link: sixDegreesChallenge.first_degree_link,
        first_degree_result: sixDegreesChallenge.first_degree_result,
        second_degree_result: sixDegreesChallenge.second_degree_result,
        third_degree_result: sixDegreesChallenge.third_degree_result,
        link_message: sixDegreesChallenge.link_message,
        showing_result: sixDegreesChallenge.showing_result,
        challenge_active: sixDegreesChallenge.challenge_active,
        loading: sixDegreesChallenge.loading,
        sound: settings.sound
    }
}

export default connect(mapStateToProps, { setTargetA, setDegree, startChallenge, resetChallenge, updateFirstDegreeLink, checkAnswer, checkAnswer2, checkAnswer3, tryAgain })(SixDegreesChallenge)