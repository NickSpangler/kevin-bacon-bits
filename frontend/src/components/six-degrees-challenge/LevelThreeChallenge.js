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
    const background_class2 = props.showing_result === false ? ('challenge-level-tier') : (props.second_degree_result.result === false ? ('wrong-answer') : ('right-answer'))

    const [answer, setAnswer] = useState({
        target_a_id: '',
        movie_one_id: '',
        target_c_id: '',
        movie_two_id: '',
        target_b_id: ''
    });

    const submitAnswer = () => {
        props.checkAnswer3(answer)
    }
    const submit_button = answer.target_a_id === '' ||
                          answer.movie_one_id === '' ||
                          answer.target_c_id === '' ||
                          answer.movie_two_id === '' ||
                          answer.target_b_id === '' ||
                          props.showing_result === true ? (<></>) : (<Button type='primary' onClick={submitAnswer}>Submit Answer</Button>)


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
        // props.updateFirstDegreeLink(props.target_a.id, data.props.movie_id, props.target_b.id)
        setAnswer({...answer, target_a_id: props.target_a.id, movie_one_id: data.props.movie_id})
    };

    const l1movie_poster = l1Msource === '' || l1Msource === null ? (<img class='with-auto-complete' src={poster_silhouette} height='200px'></img>) : (<img class='with-auto-complete' src={`https://image.tmdb.org/t/p/w200${l1Msource}`} alt={poster_silhouette} height='200px'></img>)
    
    const l1message = props.showing_result !== true ? (
      <p sytle='text-align: center'><Text keyboard>{`${props.target_a.name}`}</Text>{` was in what movie with which actor?`}</p>
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

    const [l1Avalue, l1AsetValue] = useState('');
    const [l1Aoptions, l1AsetOptions] = useState([]);
    const [l1Asource, l1AsetSource] = useState('')

    const l1AonSearch = (searchText) => {
        fetch(`http://localhost:3000/actors/auto_complete?input=${searchText}`)
        .then(resp => resp.json())
        .then(data => {
            l1AsetOptions(
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

    const l1AonSelect = (data) => {
        fetch(`http://localhost:3000/actors/get_photo?input=${data.props.actor_id}`)
        .then(resp => resp.json())
        .then(data => {
            l1AsetValue (data.name)
            l1AsetSource(data.profile_path)
            setAnswer({...answer, target_c_id: data.id})
        })
    };

    const l1AonChange = (data) => {
        if (typeof data !== 'object') {
            l1AsetValue(data);
        }
    };

    const l1Aauto_complete_or_nothing = props.showing_result === true ? (
        <><br></br></>
      ) : (
        <AutoComplete
                  value={l1Avalue}
                  options={l1Aoptions}
                  style={{   
                  width: 200,
                  }}
                  onChange={l1AonChange}
                  onSearch={l1AonSearch}
                  onSelect={l1AonSelect}
                  placeholder="Select an Actor..."
              />
      )

    const l1actor_image = l1Asource === '' || l1Asource === null ? (<img class='with-auto-complete' src={silhouette} height='200px'></img>) : (<img class='with-auto-complete' src={`https://image.tmdb.org/t/p/w200${l1Asource}`} alt={silhouette} height='200px'></img>)
    const l2actor_image = l1Asource === '' || l1Asource === null ? (<img class='adjust-auto-complete' src={silhouette} height='200px'></img>) : (<img class='adjust-for-auto-complete' src={`https://image.tmdb.org/t/p/w200${l1Asource}`} alt={silhouette} height='200px'></img>)
    
    // <----------------LEVEL TWO MOVIE SELECTION ------------------>

    const [l2Mvalue, l2MsetValue] = useState('');
    const [l2Moptions, l2MsetOptions] = useState([]);
    const [l2Msource, l2MsetSource] = useState('')

    const l2MonChange = (data) => {
        if (typeof data !== 'object') {
            l2MsetValue(data);
        }
      };

    const l2MonSearch = (searchText) => {
        fetch(`http://localhost:3000/movies/auto_complete?input=${searchText}`)
        .then(resp => resp.json())
        .then(data => {
            l2MsetOptions(
        !searchText ? [] : data.map(movie => (
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

    const l2MonSelect = (data) => {
        l2MsetValue(data.props.title)
        l2MsetSource(data.props.poster_path)
        setAnswer({...answer, movie_two_id: data.props.movie_id})
        // props.updateFirstDegreeLink(props.target_a.id, data.props.movie_id, props.target_b.id)
    };

    const l2movie_poster = l2Msource === '' || l2Msource === null ? (<img class='with-auto-complete' src={poster_silhouette} height='200px'></img>) : (<img class='with-auto-complete' src={`https://image.tmdb.org/t/p/w200${l2Msource}`} alt={poster_silhouette} height='200px'></img>)

    const l2Mauto_complete_or_nothing = props.showing_result === true ? (
      <><br></br></>
    ) : (
      <AutoComplete
                value={l2Mvalue}
                options={l2Moptions}
                style={{   
                width: 200,
                }}
                onChange={l2MonChange}
                onSearch={l2MonSearch}
                onSelect={l2MonSelect}
                placeholder="Select a Movie..."
            />
    )

    

    // <----------------LEVEL TWO ACTOR SELECTION ------------------>

    const [l2Avalue, l2AsetValue] = useState('');
    const [l2Aoptions, l2AsetOptions] = useState([]);
    const [l2Asource, l2AsetSource] = useState('')

    const l2AonSearch = (searchText) => {
        fetch(`http://localhost:3000/actors/auto_complete?input=${searchText}`)
        .then(resp => resp.json())
        .then(data => {
            l2AsetOptions(
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

    const l2AonSelect = (data) => {
        fetch(`http://localhost:3000/actors/get_photo?input=${data.props.actor_id}`)
        .then(resp => resp.json())
        .then(data => {
            l2AsetValue (data.name)
            l2AsetSource(data.profile_path)
            setAnswer({...answer, target_d_id: data.id})
        })
    };

    const l2AonChange = (data) => {
        if (typeof data !== 'object') {
            l2AsetValue(data);
        }
    };

    const l2Aauto_complete_or_nothing = props.showing_result === true ? (
        <><br></br></>
      ) : (
        <AutoComplete
                  value={l2Avalue}
                  options={l2Aoptions}
                  style={{   
                  width: 200,
                  }}
                  onChange={l2AonChange}
                  onSearch={l2AonSearch}
                  onSelect={l2AonSelect}
                  placeholder="Select an Actor..."
              />
      )

    const target_c_name = l1Avalue === '' ? ('Who') : (l1Avalue)
    const target_d_name = l2Avalue === '' ? ('which actor') : (l2Avalue)
    const l2message = props.showing_result !== true ? (
          <p sytle='text-align: center'><Text keyboard>{target_c_name}</Text>{` was in what movie with `}<Text keyboard>{`${target_d_name}`}</Text>?</p>
        ) : (
          <p className='result-message' >{props.second_degree_result.message}</p>
        )
  

    const l2actor_image2 = l2Asource === '' || l2Asource === null ? (<img class='with-auto-complete' src={silhouette} height='200px'></img>) : (<img class='with-auto-complete' src={`https://image.tmdb.org/t/p/w200${l2Asource}`} alt={silhouette} height='200px'></img>)
    const l3actor_image = l2Asource === '' || l2Asource === null ? (<img class='adjust-auto-complete' src={silhouette} height='200px'></img>) : (<img class='adjust-for-auto-complete' src={`https://image.tmdb.org/t/p/w200${l2Asource}`} alt={silhouette} height='200px'></img>)

    // <----------------LEVEL THREE MOVIE SELECTION ------------------>
    
    const target_b_movies = props.target_b.movies.map(movie => (
        {value:
            <div className='autocomplete-container' movie_id={movie.id} poster_path={movie.poster_path} title={movie.title}>
              <div className='challenge-autocomplete-one'>{movie.title}</div>
              <div className='challenge-autocomplete-two'>
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : silhouette } height='50px'></img>
              </div>
            </div>
        }
    ))

    const [l3Mvalue, l3MsetValue] = useState('');
    const [l3Moptions, l3MsetOptions] = useState(target_b_movies);
    const [l3Msource, l3MsetSource] = useState('')

    const l3MonChange = (data) => {
        if (typeof data !== 'object') {
            l3MsetValue(data);
        }
      };

    const l3MonSearch = (searchText) => {
        fetch(`http://localhost:3000/movies/auto_complete?input=${searchText}&actor_id=${props.target_b.id}`)
        .then(resp => resp.json())
        .then(data => {
            l3MsetOptions(
        !searchText ? target_b_movies : data.map(movie => (
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

    const l3MonSelect = (data) => {
        l3MsetValue(data.props.title)
        l3MsetSource(data.props.poster_path)
        setAnswer({...answer, movie_three_id: data.props.movie_id, target_b_id: props.target_b.id})
        // props.updateFirstDegreeLink(props.target_a.id, data.props.movie_id, props.target_b.id)
    };

    const l3movie_poster = l3Msource === '' || l3Msource === null ? (<img class='with-auto-complete' src={poster_silhouette} height='200px'></img>) : (<img class='with-auto-complete' src={`https://image.tmdb.org/t/p/w200${l3Msource}`} alt={poster_silhouette} height='200px'></img>)

    const l3Mauto_complete_or_nothing = props.showing_result === true ? (
      <><br></br></>
    ) : (
      <AutoComplete
                value={l3Mvalue}
                options={l3Moptions}
                style={{   
                width: 200,
                }}
                onChange={l3MonChange}
                onSearch={l3MonSearch}
                onSelect={l3MonSelect}
                placeholder="Select a Movie..."
            />
    )

    // const target_c_name = l1Avalue === '' ? ('Who') : (l1Avalue)
    const l3message = props.showing_result !== true ? (
        <p sytle='text-align: center'><Text keyboard>{target_d_name}</Text>{` was in what movie with `}<Text keyboard>{`${props.target_b.name}`}</Text>?</p>
      ) : (
        <p className='result-message' >{props.second_degree_result.message}</p>
      )

    const search_results_or_nothing = (props.showing_result === true && props.first_degree_result.result === false) ||
    (props.showing_result === true && props.second_degree_result.result === false)  ? (<><Divider orientation="center" style={{color: 'white'}}>HERE'S ONE POSSIBLE LINK:</Divider><SearchResults results={props.second_degree_result.results} loading={props.loading} /></>) : (<></>)

    return (
        <>
        <div className={`slide-in-left ${background_class}`}>
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
                        {l1actor_image}
                        <br></br>
                        {l1Aauto_complete_or_nothing}
                    </div>
                </Col>
            </Row>
            <br></br>
            { l1message }    
        </div>



        <div className={`slide-in-right ${background_class2}`}>
            <Divider orientation="center">2 Degrees</Divider>
            <Row gutter={20} type="flex" align="middle">
                <Col className="gutter-row adjust-for-auto-complete" span={4} offset={4}>
                    <div>
                        {l1actor_image}
                    </div>
                </Col>
                <Col className="gutter-row adjust-for-auto-complete" span={2}>
                    <div>
                    <RightCircleTwoTone style= {{fontSize: '50px'}} />
                    </div>
                </Col>
                <Col className="gutter-row with-auto-complete" span={4}>
                    <div>
                    {l2movie_poster}
                    <br></br>
                    {l2Mauto_complete_or_nothing}
                    </div>
                </Col>
                <Col className="gutter-row adjust-for-auto-complete" span={2}>
                    <div>
                    <RightCircleTwoTone style= {{fontSize: '50px'}} />
                    </div>
                </Col>
                <Col className="gutter-row with-auto-complete" span={4}>
                    <div>
                        {l2actor_image2}
                        <br></br>
                        {l2Aauto_complete_or_nothing}
                    </div>
                </Col>
            </Row>
            { l2message }    
        </div>



        <div className={`slide-in-left ${background_class2}`}>
            <Divider orientation="center">3 Degrees</Divider>
            <Row gutter={20} type="flex" align="middle">
                <Col className="gutter-row adjust-for-auto-complete" span={4} offset={4}>
                    <div>
                        {l2actor_image2}
                    </div>
                </Col>
                <Col className="gutter-row adjust-for-auto-complete" span={2}>
                    <div>
                    <RightCircleTwoTone style= {{fontSize: '50px'}} />
                    </div>
                </Col>
                <Col className="gutter-row with-auto-complete" span={4}>
                    <div>
                    {l3movie_poster}
                    <br></br>
                    {l3Mauto_complete_or_nothing}
                    </div>
                </Col>
                <Col className="gutter-row adjust-for-auto-complete" span={2}>
                    <div>
                    <RightCircleTwoTone style= {{fontSize: '50px'}} />
                    </div>
                </Col>
                <Col className="gutter-row adjust-for-auto-complete" span={4}>
                    <div>
                        <img style={{marginBottom: '30px'}} src={target_b_path} height='200px'></img>
                    </div>
                </Col>
            </Row>
            { l3message }    
        </div>
        
        {search_results_or_nothing}
        <br></br>
        {submit_button}
        </>
    )
}
