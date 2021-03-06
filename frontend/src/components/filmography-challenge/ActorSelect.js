import React, { useState } from 'react'
import { AutoComplete, Space, Button } from 'antd';
import silhouette from './silhouette.png'
import useSound from 'use-sound';
import Whoosh from '../../sounds/loud_buzz.mp3'

const ActorSelect = (props) => {

    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);

    const [whoosh] = useSound(Whoosh, { volume: 0.25 });

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
            }))
          )
        })
      };
    
    const onSelect = (data) => {
          props.setActor(data.props.actor_id);
      };
    
    const onChange = (data) => {
        if (typeof data !== 'object') {
        setValue(data);
        }
      };

    const selectNewActor = () => {
        props.selectNewActor();
        setValue('')
    }

    const startChallenge = () => {
      // if (props.sound === true) whoosh();
      props.getPossibleMovies(props.movie.id, props.actor.id, whoosh, props.sound);
      setValue('');
    }

    const source = props.actor === 'not selected' ? (silhouette) : (props.actor.profile_path === null? (silhouette) : (`https://image.tmdb.org/t/p/w200${props.actor.profile_path}`))
    const button = props.actor === 'not selected' || props.challenge_active === true ? (<></>) : (<Button type="primary" onClick={startChallenge}>Take the Challenge!</Button>)
    const input_or_select = props.challenge_active === false ? (<AutoComplete
        value={value}
        options={options}
        style={{
          width: 200,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        placeholder="Select an Actor..."
      />) : (<Button type='primary' onClick={selectNewActor}>Select A New Actor</Button>)

      return (
        <>
          {input_or_select}
          <br></br><br></br>
          <div className='slide-in-bottom'>
            <img src={source} height='200px'/>
          </div>
            <br></br><br></br>

          {button}
        </>
      );
}

export default ActorSelect;
