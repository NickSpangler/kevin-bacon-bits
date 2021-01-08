import React from 'react'
import { Button, Space } from 'antd';

export default function ResetButtons() {
    return (
        <div>
            <Space>
            <Button type='primary' onClick={() => alert('I wanna pick again!')}>Select New Actor</Button>
            <Button type='primary' onClick={() => alert('I give up!')}>I Give Up!</Button>
            </Space>
        </div>
    )
}
