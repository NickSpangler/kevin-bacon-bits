import React from 'react'
import { Divider, Space, Badge } from 'antd'

const History = (props) => {
    if (props.history.length === 0) {
        return (<></>)
    } else {
        return (
            <div className='slide-in-right filmography-component'>
                <Divider orientation="center">
                <Badge count={props.history.length} offset={[-55, 28]} style={{position: 'absolute', 'z-index': '10'}}>
                    Correct Answers  
                </Badge>
                </Divider>
                    <Space size={[8, 16]} wrap>
                        {props.history.map(m => <div className='roll-in-right'><img src={`https://image.tmdb.org/t/p/w200${m.poster_path}`} height='130px'></img></div>)}
                    </Space>
                <Divider orientation="left"></Divider>
            </div>
        )
    }
}

export default History