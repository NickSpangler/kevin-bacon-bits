import React from 'react';
import { Button, Space } from 'antd';
import StartingPoint from './StartingPoint';
import SelectDegree from './SelectDegree';
import { connect } from 'react-redux';
import { setTargetA, setDegree, startChallenge, resetChallenge, updateFirstDegreeLink, checkAnswer } from '../../redux/actions/sixDegreesChallengeActions'
import Loading from './Loading'
import ChallengeOptionsContainer from './ChallengeOptionsContainer'

function SixDegreesChallenge(props) {

    const challengeButton = props.target_a === 'not selected' || props.loading === true || props.challenge_active === true ? (<></>) : (<Button type='primary' onClick={() => props.startChallenge(props.target_a.id, props.degree)}>Challenge Me!</Button>)
    return (
        <>
        <div className='challenge-container'>
        <div className='challenge-content'>
            <h1 style={{color: 'white'}}>Build the link between two actors:</h1>
            <Space size='large' direction="vertical">
            <div className='slide-in-bottom'>
                <StartingPoint setTargetA={props.setTargetA} challenge_active={props.challenge_active} resetChallenge={props.resetChallenge} />
            </div>
            <div className='slide-in-top'>
                <br></br>
                <SelectDegree setDegree={props.setDegree} loading={props.loading} challenge_active={props.challenge_active} />
            </div>
            <Loading loading={props.loading} />
            <ChallengeOptionsContainer degree={props.degree} target_a={props.target_a} target_b={props.target_b} first_degree_link={props.first_degree_link} updateFirstDegreeLink={props.updateFirstDegreeLink} checkAnswer={props.checkAnswer} />
            <br></br>
            {challengeButton}
            </Space>
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
        first_degree_result: sixDegreesChallenge.link_result,
        link_message: sixDegreesChallenge.link_message,
        showing_result: sixDegreesChallenge.showing_result,
        challenge_active: sixDegreesChallenge.challenge_active,
        loading: sixDegreesChallenge.loading,
        sound: settings.sound
    }
}

export default connect(mapStateToProps, { setTargetA, setDegree, startChallenge, resetChallenge, updateFirstDegreeLink, checkAnswer })(SixDegreesChallenge)