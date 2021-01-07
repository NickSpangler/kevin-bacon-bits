import React from 'react';
import { Button, Space } from 'antd';
import StartingPoint from './StartingPoint';
import SelectDegree from './SelectDegree';
import { connect } from 'react-redux';

function SixDegreesChallenge(props) {
    return (
        <>
        <div className='challenge-container'>
        <div className='challenge-content'>
            <h1 style={{color: 'white'}}>Build the link between two actors:</h1>
            <Space size='large' direction="vertical">
            <div className='slide-in-bottom'>
                <StartingPoint />
            </div>
            <div className='slide-in-top'>
                <br></br>
                <h3 style={{color: 'white'}}>Select degree of difficulty:</h3>
                <SelectDegree />
            </div>
            </Space>
        </div>
        </div>
        </>
    )
}

const mapStateToProps = ({ sixDegreesChallenge, settings }) => {
    return {
        target_a: sixDegreesChallenge.target_a,
        target_b: sixDegreesChallenge.target_b,
        link: sixDegreesChallenge.link,
        link_result: sixDegreesChallenge.link_result,
        link_message: sixDegreesChallenge.link_message,
        showing_result: sixDegreesChallenge.showing_result,
        challenge_active: sixDegreesChallenge.challenge_active,
        sound: settings.sound
    }
}

export default connect(mapStateToProps)(SixDegreesChallenge)