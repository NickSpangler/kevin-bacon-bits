import React from 'react'
import LevelOneChallenge from './LevelOneChallenge'
import LevelTwoChallenge from './LevelTwoChallenge'
import LevelThreeChallenge from './LevelThreeChallenge'
import { Button } from 'antd'

export default function ChallengeOptionsContainer(props) {
    const { degree, first_degree_link } = props

    const submit_answer = () => {
        props.checkAnswer(degree, first_degree_link)
    }

    const button_or_no = props.first_degree_link.movie_id === '' || props.showing_result === true ? (<></>) : (<Button type='primary' onClick={submit_answer}>Submit Answer</Button>)



    if (props.target_b === 'not selected') {
        return (
        <></>
        )
    } else if (props.target_b !== 'not selected' && props.degree === 1) {
        return (
            <>
                <h3 style={{color: 'white'}}>Your challenge is to connect {props.target_a.name} to {props.target_b.name}:</h3>
                <LevelOneChallenge 
                degree={props.degree} 
                target_a={props.target_a} 
                target_b={props.target_b} 
                first_degree_link={props.first_degree_link} 
                updateFirstDegreeLink={props.updateFirstDegreeLink} 
                showing_result={props.showing_result} 
                first_degree_result={props.first_degree_result} 
                loading={props.loading}/>
                <br></br>
                {button_or_no}
            </>
            )
    } else if (props.target_b !== 'not selected' && props.degree === 2) {
        return (
            <>
                <h3 style={{color: 'white'}}>Your challenge is to connect {props.target_a.name} to {props.target_b.name}:</h3>
                <LevelTwoChallenge 
                degree={props.degree} 
                target_a={props.target_a} 
                target_b={props.target_b} 
                first_degree_link={props.first_degree_link} 
                updateFirstDegreeLink={props.updateFirstDegreeLink} 
                showing_result={props.showing_result} 
                first_degree_result={props.first_degree_result} 
                second_degree_result={props.second_degree_result} 
                loading={props.loading} 
                checkAnswer2={props.checkAnswer2}
                />
                <br></br>
                {button_or_no}
        </>
            )
    } else if (props.target_b !== 'not selected' && props.degree === 3) {
        return (
            <>
                <h3 style={{color: 'white'}}>Your challenge is to connect {props.target_a.name} to {props.target_b.name}:</h3>
                <LevelThreeChallenge 
                degree={props.degree} 
                target_a={props.target_a} 
                target_b={props.target_b} 
                first_degree_link={props.first_degree_link} 
                updateFirstDegreeLink={props.updateFirstDegreeLink} 
                showing_result={props.showing_result} 
                first_degree_result={props.first_degree_result} 
                second_degree_result={props.second_degree_result} 
                third_degree_result={props.third_degree_result} 
                loading={props.loading} 
                loading_answer={props.loading_answer} 
                checkAnswer3={props.checkAnswer3}
                />
                <br></br>
                {button_or_no}
        </>
            )
    }
}
