import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export default function SixDegreesChallenge() {
    return (
        <div className='challenge-container'>
        <div className='challenge-content'>
        <br></br><br></br><br></br>
        <div className='challenge-component slide-in-bottom'>
        <Result
            status="404"
            title="Sorry, we're still unboxing this feature."
            subTitle="Check back later for updates, and enjoy another feature at this time."
            extra={[<Link to='/six-degrees-search'>
                        <Button type="primary">Six Degrees Search</Button>
                    </Link>,
                    <Link to='/filmography-challenge'>
                        <Button type="primary">Filmography Challenge</Button>
                    </Link>
            ]}
        />
        </div>
        </div>
        </div>
    )
}