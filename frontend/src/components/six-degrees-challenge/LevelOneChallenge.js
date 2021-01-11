import React, { useState } from 'react';
import { RightCircleTwoTone } from '@ant-design/icons';
import { Row, Col, Divider, Typography, AutoComplete, Button } from 'antd';
import silhouette from './silhouette.png'
import poster_silhouette from './poster_silhouette.png'
import SearchResults from '../six-degrees-search/SearchResults'

const { Text } = Typography

export default function LevelOneChallenge(props) {
    const target_a_path = props.target_a.profile_path === null ? silhouette : (`https://image.tmdb.org/t/p/w200${props.target_a.profile_path}`)
    const target_b_path = props.target_b.profile_path === null ? silhouette : (`https://image.tmdb.org/t/p/w200${props.target_b.profile_path}`)
    
    const level_class = 'slide-in-right'
    const background_class = props.showing_result === false ? ('challenge-level-tier') : (props.first_degree_result.result === false ? ('wrong-answer') : ('right-answer'))

    const target_a_movies = props.target_a.movies.map(movie => (
        {value:
            <div className='autocomplete-container' movie_id={movie.id} poster_path={movie.poster_path} title={movie.title}>
              <div className='challenge-autocomplete-one'>{movie.title}</div>
              <div className='challenge-autocomplete-two'>
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : silhouette } height='50px'></img>
              </div>
            </div>
        }
    ))

    const [value, setValue] = useState('');
    const [options, setOptions] = useState(target_a_movies);
    const [source, setSource] = useState('')

    const onChange = (data) => {
        if (typeof data !== 'object') {
        setValue(data);
        }
      };

    const onSearch = (searchText) => {
    fetch(`http://localhost:3000/movies/auto_complete?input=${searchText}&actor_id=${props.target_a.id}`)
    .then(resp => resp.json())
    .then(data => {
      setOptions(
      !searchText ? target_a_movies : data.map(movie => (
        { value: 
            <div className='autocomplete-container' movie_id={movie.id} poster_path={movie.poster_path} title={movie.title}>
              <div className='challenge-autocomplete-one'>{movie.title}</div>
              <div className='challenge-autocomplete-two'>
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : silhouette } height='50px'></img>
              </div>
            </div>
            }
        ))
      )
    })
  };

    const onSelect = (data) => {
        setValue(data.props.title)
        setSource(data.props.poster_path)
        props.updateFirstDegreeLink(props.target_a.id, data.props.movie_id, props.target_b.id)
    };

    const movie_poster = source === '' || source === null ? (<img src={poster_silhouette} height='200px'></img>) : (<img src={`https://image.tmdb.org/t/p/w200${source}`} alt={poster_silhouette} height='200px'></img>)
    const message = props.showing_result !== true ? (
      <p sytle='text-align: center'><Text keyboard>{`${props.target_a.name}`}</Text>{` was in what movie with `}<Text keyboard>{`${props.target_b.name}`}</Text>?</p>
    ) : (
      <p className='result-message' >{props.first_degree_result.message}</p>
    )
    const auto_complete_or_nothing = props.showing_result === true ? (
      <><br></br></>
    ) : (
      <AutoComplete
                value={value}
                options={options}
                style={{
                width: 300,
                marginBottom: '12px'
                }}
                onChange={onChange}
                onSearch={onSearch}
                onSelect={onSelect}
                placeholder="Select a Movie..."
            />
    )

    return (
        <div className={`${level_class} ${background_class}`}>
            <Divider orientation="center">1 Degree</Divider>
            <Row gutter={100} type="flex" align="middle">
                <Col className="gutter-row" span={4} offset={3}>
                    <div>
                    <img src={target_a_path} height='200px'></img>
                    </div>
                </Col>
                <Col className="gutter-row" span={1}>
                    <div>
                    <RightCircleTwoTone style= {{fontSize: '50px'}} />
                    </div>
                </Col>
                <Col className="gutter-row" span={4}>
                    <div>
                    {movie_poster}
                    </div>
                </Col>
                <Col className="gutter-row" span={1}>
                    <div>
                    <RightCircleTwoTone style= {{fontSize: '50px'}} />
                    </div>
                </Col>
                <Col className="gutter-row" span={4}>
                    <div>
                        <img src={target_b_path} height='200px'></img>
                    </div>
                </Col>
            </Row>
            <br></br>
            {auto_complete_or_nothing}
            <br></br>
            <br></br>
            { message }    
        </div>
    )
}
