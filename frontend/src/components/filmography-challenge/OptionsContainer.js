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
                    {props.possible_answers.map( option => <Popconfirm title="Are you sure he was in this movie?" okText="Yes" cancelText="No"><img src={`https://image.tmdb.org/t/p/w200${option.poster_path}`}></img></Popconfirm>)}
                </Space>
            </>
        )
    }
}

export default OptionsContainer
