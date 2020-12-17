import React from 'react'
import { RightCircleTwoTone } from '@ant-design/icons';
import { Row, Col, Divider } from 'antd';

const style = { background: '#0092ff', padding: '8px 0' };

export default function Level(props) {
    return (
        <div>
            <Divider orientation="center">Results</Divider>
            <Row gutter={16}>
                <Col className="gutter-row" span={4}>
                    <div style={style}>col-6</div>
                </Col>
                <Col className="gutter-row" span={3}>
                    <div>
                    <RightCircleTwoTone style= {{fontSize: '50px'}} />
                    </div>
                </Col>
                <Col className="gutter-row" span={4}>
                    <div style={style}>col-6</div>
                </Col>
                <Col className="gutter-row" span={3}>
                    <div>
                    <RightCircleTwoTone style= {{fontSize: '50px'}} />
                    </div>
                </Col>
                <Col className="gutter-row" span={4}>
                    <div style={style}>col-6</div>
                </Col>
            </Row>

            <br></br>
            <br></br>

            <Row>
    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
      Col
    </Col>
    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
      Col
    </Col>
    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
      Col
    </Col>
  </Row>





            
            <p>{`${props.data.target_a.name} played ${props.data.target_a.character} in ${props.data.movie.title} with ${props.data.target_b.name} as ${props.data.target_b.character}`}</p>
        </div>
    )
}
