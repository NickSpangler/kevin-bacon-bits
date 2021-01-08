import React from 'react'

export default function ChallengeOptionsContainer(props) {
    if (props.target_b === 'not selected') {
        return (
        <></>
        )
    } else if (props.target_b !== 'not selected' && props.degree === 1) {
        return (
            <>
                <h1 style={{color: 'white'}}>Your challenge is to connect {props.target_a.name} to {props.target_b.name}:</h1>
            </>
            )
    } else if (props.target_b !== 'not selected' && props.degree === 2) {
        return (
            <>
                <h1 style={{color: 'white'}}>Two Degree Challenge</h1>
            </>
            )
    } else if (props.target_b !== 'not selected' && props.degree === 3) {
        return (
            <>
                <h1 style={{color: 'white'}}>THIRD Degree Challenge</h1>
            </>
            )
    }
}
