import React, { useState } from 'react'
import { AutoComplete, Space, Button } from 'antd';
import silhouette from './silhouette.png'

const ActorSelect = (props) => {

    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);
    // const [source, setSource] = useState('')

    const onSearch = (searchText) => {
        fetch(`http://localhost:3000/actors/auto_complete?input=${searchText}`)
        .then(resp => resp.json())
        .then(data => {
          setOptions(
          !searchText ? [] : data.map(person => ({ value: person.name }))
          )
        })
      };
    
    const onSelect = (data) => {
          props.setActor(data)
      };
    
    const onChange = (data) => {
        setValue(data);
      };

    const source = props.actor === 'not selected' ? (silhouette) : (`https://image.tmdb.org/t/p/w200${props.actor.profile_path}`)
    const button = props.actor === 'not selected' ? (<></>) : (<Button type="primary" onClick={props.initializeCurrentMovie}>Take the Challenge!</Button>)

      return (
        <>
          <AutoComplete
            value={value}
            options={options}
            style={{
              width: 200,
            }}
            onSelect={onSelect}
            onSearch={onSearch}
            onChange={onChange}
            placeholder="Select an Actor..."
          />
          <br></br><br></br>
          <img src={source} height='200px'/>
            <br></br><br></br>
          {button}
        </>
      );
}

export default ActorSelect;