import React from 'react'
import { Button, Space } from 'antd';

export default function ResetButtons(props) {

    const handleReset = () => {
        props.resetChallenge();
        props.setValue('');
        props.setSource('');
    }
    return (
        <div>
            <Space>
            <Button type='primary' onClick={handleReset} >Select New Actor</Button>
            <Button type='primary' onClick={() => alert('I give up!')}>I Give Up!</Button>
            </Space>
        </div>
    )
}
