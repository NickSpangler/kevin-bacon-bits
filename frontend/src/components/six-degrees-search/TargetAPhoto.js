import React from 'react'

const TargetAPhoto = (props) => {
    if (props.source !== '') {
        return (
            <img src={props.source}> </img>
        )
    } else {
        return (<></>)
    }
}

export default TargetAPhoto