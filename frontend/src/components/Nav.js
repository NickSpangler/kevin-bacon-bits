import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <div>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/six-degrees-search'>Six Degrees Search</Link></li>
                <li><Link to='/six-degrees-challenge'>Six Degrees Challenge</Link></li>
                <li><Link to='/filmography-challenge'>Filmography Challenge</Link></li>
            </ul>
        </div>
    )
}
