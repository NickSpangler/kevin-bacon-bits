import React from 'react';
import { Result, Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import StartingPoint from './StartingPoint';
import SelectDegree from './SelectDegree';

export default function SixDegreesChallenge() {
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