import React from 'react'
import { Button, Space, Upload, Popconfirm } from 'antd';

const OptionsContainer = (props) => {
    if (props.possible_answers === 'between rounds') {
        return (
            <></>
    )} else {
        return (
            <>
                <Space>
                    {props.possible_answers.map( option => <img src={`https://image.tmdb.org/t/p/w200${option.poster_path}`}></img>)}
                </Space>
            </>
        )
    }
}

export default OptionsContainer
