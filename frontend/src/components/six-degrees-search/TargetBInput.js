import React, { Component } from 'react'
import { AutoComplete } from 'antd'

export default class TargetBInput extends Component {
    state = {
        input: ''
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    render() {
        return (
            <div>
          
                    <AutoComplete 
                    name='targetB'
                    placeholder='...to'
                    value={this.state.input}
                    onChange={e => this.handleChange(e)}
                    style={{
                    width: 200,
                    }}
                    />

            </div>
        )
    }
}






import React, { useState } from 'react';
import { AutoComplete } from 'antd';

const mockVal = (str, repeat = 1) => {
  return {
    value: str.repeat(repeat),
  };
};

const Complete = () => {
    
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const onSearch = (searchText) => {
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
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
        options={options}
        style={{
          width: 200,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="input here"
      />
      <br />
      <br />
      <AutoComplete
        value={value}
        options={options}
        style={{
          width: 200,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        placeholder="control mode"
      />
    </>
  );
};

ReactDOM.render(<Complete />, mountNode);