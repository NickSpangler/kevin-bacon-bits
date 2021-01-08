import React from 'react'
import { Radio } from 'antd';

export default function SelectDegree(props) {
    const onDegreeSelect = (data) => {
        props.setDegree(data.target.value)
    }
    
    if (props.loading === true || props.challenge_active === true) {
        return (
            <></>
        )
    } else {
        return (
            <div>
                <h3 style={{color: 'white'}}>Select degree of difficulty:</h3>
                <Radio.Group defaultValue={1} buttonStyle="solid">
                    <Radio.Button value={1} onChange={onDegreeSelect}>One Degree</Radio.Button>
                    <Radio.Button value={2} onChange={onDegreeSelect}>Two Degrees</Radio.Button>
                    <Radio.Button value={3} onChange={onDegreeSelect}>Three Degrees</Radio.Button>
                </Radio.Group>
            </div>
        ) 
    }
}
