import React from 'react'
import { Radio } from 'antd';

export default function SelectDegree() {
    return (
        <div>
            <Radio.Group defaultValue="a" buttonStyle="solid">
                <Radio.Button value="a">One Degree</Radio.Button>
                <Radio.Button value="b">Two Degrees</Radio.Button>
                <Radio.Button value="c">Three Degrees</Radio.Button>
            </Radio.Group>
        </div>
    )
}
