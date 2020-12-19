import React from 'react'
import { Divider, Space } from 'antd'

const History = (props) => {
    if (props.history.length === 0) {
        return (<></>)
    } else {
        return (
            <div>
                <Divider orientation="left">History</Divider>
                    <Space size={[8, 16]} wrap>
                        {props.history.map(m => <img src={`https://image.tmdb.org/t/p/w200${m.poster_path}`} height='130px'></img>)}
                    </Space>
                <Divider orientation="left"></Divider>
            </div>
        )
    }
}

export default History