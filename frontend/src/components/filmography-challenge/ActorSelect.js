import React, { useState } from 'react'
import { AutoComplete, Space, Button } from 'antd';

const ActorSelect = (props) => {

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
          
    
        // THIS IS ONLY SETTING LOCAL SOURCE FOR PHOTO -> SHOULD NOW COME FROM STATE, SELECTED_ACTOR
        // console.log('onSelect', data);
        // fetch(`http://localhost:3000/actors/get_photo?input=${data}`)
        // .then(resp => resp.json())
        // .then(data => {
        //   setSource(
        //     data.profile_path
        //   )
        // })
    
      };
    
      const onChange = (data) => {
        setValue(data);
        // HERE set value of state: actor
        // WRONG!
        // props.updateTargetA(data)
      };
    
      return (
        <>
          <Space>
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
          
          </Space>
        </>
      );
}

export default ActorSelect;
