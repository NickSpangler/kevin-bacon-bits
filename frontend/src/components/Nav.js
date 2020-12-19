import '../css/Nav.css';
import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from 'antd'
import { connect } from 'react-redux';
import { PropertySafetyFilled } from '@ant-design/icons';

function Nav(props) {
    return (
        <div className="demo">
            <div className="demo-nav">
                <Link to='/'>Home</Link>
                <Link to='/six-degrees-search'>Six Degrees Search</Link>
                <Link to='/six-degrees-challenge'>Six Degrees Challenge</Link>
                <Badge count={props.total_history} offset={[2, 15]} size="small">
                <Link to='/filmography-challenge'>Filmography Challenge</Link>
                </Badge>
            </div>
        </div>
    )
}

const mapStateToProps = ({filmography}) => {
    return ({
        total_history: filmography.total_history
    })
}

export default connect(mapStateToProps)(Nav)