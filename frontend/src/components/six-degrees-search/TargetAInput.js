import React, { useState } from 'react';
import { AutoComplete } from 'antd';

const mockVal = (str, repeat = 1) => {
  return {
    value: str.repeat(repeat),
  };
};

const getActors= (input) => {
  return (function() {
    fetch(`http://localhost:3000/actors/auto_complete?input=${input}`)
    .then(resp => resp.json())
    .then(data => {
      let names = data.map(person => ({value: person.name}))
      console.log(names)
      return names
    })
  })()
}

const TargetAInput = () => {

  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const onSearch = (searchText) => {

    setOptions(
      // !searchText ? [] : [{value: "one"}, {value: "two"}, {value: "three"}]
      // !searchText ? [] : [{value: getActors(searchText)[0].name}, {value: getActors(searchText)[1].name}, {value: getActors(searchText)[2].name}]
    );

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
        placeholder="Find the link from..."
      />
      <br></br>
      <AutoComplete
        style={{
          width: 200,
        }}
        onChange={getActors}
      />
    </>
  );
};

export default TargetAInput

