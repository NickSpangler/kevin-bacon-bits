import React from 'react'
import { Button, Space, Upload, Popconfirm } from 'antd';
import filmographyReducer from '../../redux/reducers/filmographyReducer';

const OptionsContainer = (props) => {
    if (props.possible_answers === 'between rounds') {
        return (
            <></>
    )} else {
        return (
            <>
                <p>Which of these films featured {props.actor.name} in {props.film.release_year}?</p>
                <Space>
                    {props.possible_answers.map( option => <Popconfirm title={`Are you sure ${props.actor.name.split(' ')[0]} was in this movie?`} okText="Yes" cancelText="No"><img src={`https://image.tmdb.org/t/p/w200${option.poster_path}`}></img></Popconfirm>)}
                </Space>
            </>
        )
    }
}

export default OptionsContainer
