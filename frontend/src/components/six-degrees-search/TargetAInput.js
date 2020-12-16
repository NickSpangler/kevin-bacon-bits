import React, { useState } from 'react';
import { AutoComplete, Space } from 'antd';
import TargetAPhoto from './TargetAPhoto'

const TargetAInput = () => {

  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [source, setSource] = useState('')

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
    console.log('onSelect', data);
    fetch(`http://localhost:3000/actors/get_photo?input=${data}`)
    .then(resp => resp.json())
    .then(data => {
      setSource(
        data.profile_path
      )
    })

  };

  const onChange = (data) => {
    setValue(data);
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

export default TargetAInput