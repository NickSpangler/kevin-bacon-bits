import React, { useState } from 'react';
import { AutoComplete, Space } from 'antd';
import silhouette from './silhouette.png'
import ResetButtons from './ResetButtons'

const StartingPoint = (props) => {

  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [source, setSource] = useState('')

  const onSearch = (searchText) => {
    fetch(`http://localhost:3000/actors/auto_complete?input=${searchText}`)
    .then(resp => resp.json())
    .then(data => {
      setOptions(
      !searchText ? [] : data.map(person => (
        { value: 
            <div className='autocomplete-container' actor_id={person.id} profile_path={person.profile_path} name={person.name}>
              <div className='autocomplete-one'>{person.name}</div>
              <div className='autocomplete-two'>
                <img src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : silhouette } height='50px'></img>
              </div>
            </div>
            }
        ))
      )
    })
  };

  const onSelect = (data) => {
    fetch(`http://localhost:3000/actors/get_photo?input=${data.props.actor_id}`)
    .then(resp => resp.json())
    .then(data => {
      setValue (data.name)
      setSource(data.profile_path)
      props.setTargetA(data.id) 
    })

  };

  const onChange = (data) => {
    if (typeof data !== 'object') {
    setValue(data);
    }
  };

  const starting_point_photo = source === '' || source === null ? (<img src={silhouette} height='200px'></img>) : (<img src={`https://image.tmdb.org/t/p/w200${source}`} alt={silhouette} height='200px'></img>)

  const input_or_buttons = props.challenge_active ? (
    <ResetButtons resetChallenge={props.resetChallenge} />
  ) : (
    <AutoComplete
        value={value}
        options={options}
        style={{
          width: 200,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        placeholder="Select a Starting Point..."
      />
  )

  return (
    <>
      <Space direction="vertical">
      {starting_point_photo}
      {/* <AutoComplete
        value={value}
        options={options}
        style={{
          width: 200,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        placeholder="Select a Starting Point..."
      />
      <ResetButtons /> */}
      {input_or_buttons}
      </Space>
    </>
  );
};

export default StartingPoint;