import React from 'react'
import { RightCircleTwoTone } from '@ant-design/icons';
import { Row, Col, Divider, Typography } from 'antd';
import silhouette from './silhouette.png'

const { Text } = Typography

export default function Level(props) {
    const degrees = props.degree === 1 ? "Degree" : "Degrees"
    const target_a_path = props.data.target_a.profile_path === null ? silhouette : (`https://image.tmdb.org/t/p/w200${props.data.target_a.profile_path}`)
    const target_b_path = props.data.target_b.profile_path === null ? silhouette : (`https://image.tmdb.org/t/p/w200${props.data.target_b.profile_path}`)
    return (
        <div>
            <Divider orientation="center">{`${props.degree} ${degrees}`}</Divider>
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
                    <img src={`https://image.tmdb.org/t/p/w200${props.data.movie.poster_path}`} height='200px'></img>
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
            <p sytle='text-align: center'><Text keyboard>{`${props.data.target_a.name}`}</Text>{`  (as ${props.data.target_a.character}) was in  `}<Text keyboard>{`${props.data.movie.title}`}</Text>{` with `}<Text keyboard>{`${props.data.target_b.name}`}</Text>{` (as ${props.data.target_b.character}).`}</p>
        </div>
    )
}

