import React from 'react'
import { Button, Space, Upload, Popconfirm } from 'antd';
import filmographyReducer from '../../redux/reducers/filmographyReducer';

const OptionsContainer = (props) => {

    const makeChoice = (choice) => {
        if (choice === props.film.title) {
            props.rightAnswer()
        } else {
            props.wrongAnswer()
        }
    }

    if (props.possible_answers.length === 0) {
        return (
            <></>
    )} else {
        return (
            <>
                <p>Which of these films featured {props.actor.name} in {props.film.release_year}?</p>
                <Space>
                    {props.possible_answers.map( option => {
                        return (
                            <Popconfirm title={`Are you sure ${props.actor.name.split(' ')[0]} was in ${option.title}?`} 
                            okText="Yes" 
                            cancelText="No" 
                            placement="bottom"
                            onConfirm={() => makeChoice(option.title)}
                            data='you found me'>
                                <img src={`https://image.tmdb.org/t/p/w200${option.poster_path}`} height='250px'></img>
                            </Popconfirm>)}
                        )
                    }
                </Space>
            </>
        )
    }
}

export default OptionsContainer