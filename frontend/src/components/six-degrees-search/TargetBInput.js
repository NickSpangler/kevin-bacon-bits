import React, { useState } from 'react';
import { AutoComplete } from 'antd';

const TargetBInput = () => {

  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

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
  };

  const onChange = (data) => {
    setValue(data);
  };

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
        placeholder="...to"
      />
    </>
  );
};

export default TargetBInput