import React from 'react'
import { Roller } from "react-awesome-spinners";

export default function Loading(props) {
    if (props.loading === true) {
        return (
            <div>
                <Roller />
                <p>Creating your challenge...</p>
            </div>
        )
    } else {
        return (<></>)
    }
}
