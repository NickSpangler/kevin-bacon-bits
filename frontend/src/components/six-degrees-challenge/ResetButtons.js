import React from 'react'
import { Button, Space } from 'antd';
import { convertLegacyProps } from 'antd/lib/button/button';

export default function ResetButtons(props) {
    return (
        <div>
            <Space>
            <Button type='primary' onClick={props.resetChallenge} >Select New Actor</Button>
            <Button type='primary' onClick={() => alert('I give up!')}>I Give Up!</Button>
            </Space>
        </div>
    )
}
