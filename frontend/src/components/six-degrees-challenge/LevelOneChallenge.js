import React from 'react'
import { RightCircleTwoTone } from '@ant-design/icons';
import { Row, Col, Divider, Typography } from 'antd';
import silhouette from './silhouette.png'

export default function LevelOneChallenge(props) {
    // const degrees = props.degree === 1 ? "Degree" : "Degrees"
    const target_a_path = props.target_a.profile_path === null ? silhouette : (`https://image.tmdb.org/t/p/w200${props.target_a.profile_path}`)
    const target_b_path = props.target_b.profile_path === null ? silhouette : (`https://image.tmdb.org/t/p/w200${props.target_b.profile_path}`)
    // const level_class = props.degree % 2 === 0 ? 'slide-in-right' : 'slide-in-left'
    const level_class = 'slide-in-right'
    return (
        <div className={`${level_class} level-tier`}>
            {/* <Divider orientation="center">{`${props.degree} ${degrees}`}</Divider> */}
            <Row gutter={20} type="flex" align="middle">
                <Col className="gutter-row" span={4} offset={4}>
                    <div>
                    <img src={target_a_path} height='200px'></img>
                    </div>
                </Col>
                <Col className="gutter-row" span={2}>
                    <div>
                    <RightCircleTwoTone style= {{fontSize: '50px'}} />
                    </div>
                </Col>
                <Col className="gutter-row" span={4}>
                    <div>
                    {/* <img src={`https://image.tmdb.org/t/p/w200${props.data.movie.poster_path}`} height='200px'></img> */}
                    <p>placeholder</p>
                    </div>
                </Col>
                <Col className="gutter-row" span={2}>
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
            <p sytle='text-align: center'><Text keyboard>{`${props.target_a.name}`}</Text>{` was in what movie with `}<Text keyboard>{`${props.target_b.name}`}</Text>?</p>
        </div>
    )
}
