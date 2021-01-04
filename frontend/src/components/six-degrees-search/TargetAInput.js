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
            <div className='autocomplete-container' data-person={person}>
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
    alert(data)
    // console.log('onSelect', data);
    fetch(`http://localhost:3000/actors/get_photo?input=${data}`)
    .then(resp => resp.json())
    .then(data => {
      setSource(data.profile_path)
    })

  };

  const onChange = (data) => {
    setValue(data);
    props.updateTargetA(data)
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