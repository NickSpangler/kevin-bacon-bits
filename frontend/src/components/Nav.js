import '../css/Nav.css';
import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from 'antd'

export default function Nav() {
    return (
        <div className="demo">
            <div className="demo-nav">
                <Link to='/'>Home</Link>
                <Link to='/six-degrees-search'>Six Degrees Search</Link>
                <Link to='/six-degrees-challenge'>Six Degrees Challenge</Link>
                <Badge count={0} showZero offset={[2, 15]} size="small">
                <Link to='/filmography-challenge'>Filmography Challenge</Link>
                </Badge>
            </div>
        </div>
    )
}