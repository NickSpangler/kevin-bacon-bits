import React from 'react'
import { Roller } from "react-awesome-spinners";

export default function LoadingAnswer(props) {
    if (props.loading_answer === true) {
        return (
            <div>
                <Roller />
                <p>Reviewing your answer...</p>
            </div>
        )
    } else {
        return (<></>)
    }
}
