import React from 'react';
import Level from './Level';
import { Roller } from "react-awesome-spinners";

export default function SearchResults(props) {
    if (props.loading === true) {
        return (
            <div>
                <Roller />
                <p>Searching for link...</p>
            </div>
        )

    } else if (props.results.value) {
        return (
            <div>
                <p>{props.results.value}</p>
            </div>
        )
    } else {
        return (
            <div>
                {props.results.map( (level, index) => <Level data={level} degree={index + 1}/>)}
            </div>
        )
    }
}
