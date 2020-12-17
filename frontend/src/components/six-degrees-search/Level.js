import React from 'react'
import { RightCircleTwoTone } from '@ant-design/icons';
import { Row, Col, Divider } from 'antd';

const style = { background: '#0092ff', padding: '8px 0' };

export default function Level(props) {
    return (
        <div>
            <Divider orientation="center">Results</Divider>
            <Row gutter={20} type="flex" align="middle">
                <Col className="gutter-row" span={4} offset={4}>
                    <div>
                    <img src={`https://image.tmdb.org/t/p/w200${props.data.target_a.profile_path}`} height='200px'></img>
                    <p>{`${props.data.target_a.name}`}</p>
                    <p>{`played ${props.data.target_a.character} in:`}</p>
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
                    <p>{props.data.movie.title}</p>
                    </div>
                </Col>
                <Col className="gutter-row" span={2}>
                    <div>
                    <RightCircleTwoTone style= {{fontSize: '50px'}} />
                    </div>
                </Col>
                <Col className="gutter-row" span={4}>
                    <div>
                        <img src={`https://image.tmdb.org/t/p/w200${props.data.target_b.profile_path}`} height='200px'></img>
                        <p>{`with ${props.data.target_b.name}`}</p>
                        <p>{`who played ${props.data.target_b.character}.`}</p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
