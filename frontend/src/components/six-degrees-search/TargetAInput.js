import React, { useState } from 'react';
import { AutoComplete, Space } from 'antd';
import TargetAPhoto from './TargetAPhoto'
import silhouette from './silhouette.png'

const TargetAInput = (props) => {

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
      setValue(data.name)
      setSource(data.profile_path)
      props.updateTargetA(data.id)
    })

  };

  const onChange = (data) => {
    if (typeof data !== 'object') {
    setValue(data);
    }
  };

  return (
    <>
      <Space>
      <TargetAPhoto source={source} />
      <AutoComplete
        value={value}
        options={options}
        style={{
          width: 200,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        placeholder="Find the link from..."
      />
      
      </Space>
    </>
  );
};

export default TargetAInput;