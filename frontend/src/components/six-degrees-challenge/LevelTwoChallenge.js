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

    // <----------------LEVEL ONE MOVIE SELECTION ------------------>
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

    const [l1Mvalue, l1MsetValue] = useState('');
    const [l1Moptions, l1MsetOptions] = useState(target_a_movies);
    const [l1Msource, l1MsetSource] = useState('')

    const l1MonChange = (data) => {
        if (typeof data !== 'object') {
            l1MsetValue(data);
        }
      };

    const l1MonSearch = (searchText) => {
        fetch(`http://localhost:3000/movies/auto_complete?input=${searchText}&actor_id=${props.target_a.id}`)
        .then(resp => resp.json())
        .then(data => {
            l1MsetOptions(
        !searchText ? target_a_movies : data.map(movie => (
            { value: 
                <div className='autocomplete-container' movie_id={movie.id} poster_path={movie.poster_path} title={movie.title}>
                <div className='challenge-autocomplete-one'>{movie.title}</div>
                <div className='challenge-autocomplete-two'>
                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : silhouette } height='50px'></img>
                </div>
                </div>
                }
            )))
        })
    };

    const l1MonSelect = (data) => {
        l1MsetValue(data.props.title)
        l1MsetSource(data.props.poster_path)
        props.updateFirstDegreeLink(props.target_a.id, data.props.movie_id, props.target_b.id)
    };

    const l1movie_poster = l1Msource === '' || l1Msource === null ? (<img class='with-auto-complete' src={poster_silhouette} height='200px'></img>) : (<img class='with-auto-complete' src={`https://image.tmdb.org/t/p/w200${l1Msource}`} alt={poster_silhouette} height='200px'></img>)
    
    const l1message = props.showing_result !== true ? (
      <p sytle='text-align: center'><Text keyboard>{`${props.target_a.name}`}</Text>{` was in what movie with what actor?`}</p>
    ) : (
      <p className='result-message' >{props.first_degree_result.message}</p>
    )
    const l1Mauto_complete_or_nothing = props.showing_result === true ? (
      <><br></br></>
    ) : (
      <AutoComplete
                value={l1Mvalue}
                options={l1Moptions}
                style={{   
                width: 200,
                }}
                onChange={l1MonChange}
                onSearch={l1MonSearch}
                onSelect={l1MonSelect}
                placeholder="Select a Movie..."
            />
    )

    // <----------------LEVEL ONE ACTOR SELECTION ------------------>
   

    const search_results_or_nothing = props.showing_result === true && props.first_degree_result.result === false ? (<SearchResults results={props.first_degree_result.results} loading={props.loading} />) : (<></>)

    return (
        <>
        <div className={`${level_class} ${background_class}`}>
            <Divider orientation="center">1 Degree</Divider>
            <Row gutter={20} type="flex" align="middle">
                <Col className="gutter-row adjust-for-auto-complete" span={4} offset={4}>
                    <div>
                    <img src={target_a_path} height='200px'></img>
                    </div>
                </Col>
                <Col className="gutter-row adjust-for-auto-complete" span={2}>
                    <div>
                    <RightCircleTwoTone style= {{fontSize: '50px'}} />
                    </div>
                </Col>
                <Col className="gutter-row" span={4}>
                    <div>
                    {l1movie_poster}
                    <br></br>
                    {l1Mauto_complete_or_nothing}
                    </div>
                </Col>
                <Col className="gutter-row adjust-for-auto-complete" span={2}>
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
            { l1message }    
        </div>
        {search_results_or_nothing}
        </>
    )
}
