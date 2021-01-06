import React from 'react';
import { Result, Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import StartingPoint from './StartingPoint';
import SelectDegree from './SelectDegree';

export default function SixDegreesChallenge() {
    return (
        <>
        <div className='challenge-container'>
        <div className='challenge-content'>
            <h1 style={{color: 'white'}}>Build the link between two actors:</h1>
            <Space size='large'>
            <div>
                <StartingPoint />
                {/* <h3 style={{color: 'white', marginRight: '50px'}}>Select starting point:</h3> */}
            </div>
            <div>
                <SelectDegree />
                <h3 style={{color: 'white', marginLeft: '50px'}}>Select degree of difficulty:</h3>
            </div>
            </Space>
        </div>
        </div>
        </>
    )

    // return (
    //     <div className='challenge-container'>
    //     <div className='challenge-content'>
    // //     <br></br><br></br><br></br>
    // //     <div className='challenge-component slide-in-bottom'>
    // //     <Result
    //         status="404"
    //         title="Sorry, we're still unboxing this feature."
    //         subTitle="Check back later for updates, and enjoy another feature at this time."
    //         extra={[<Link to='/six-degrees-search'>
    //                     <Button type="primary">Six Degrees Search</Button>
    //                 </Link>,
    //                 <Link to='/filmography-challenge'>
    //                     <Button type="primary">Filmography Challenge</Button>
    //                 </Link>
    //         ]}
    //     />
    //     </div>
    //     </div>
    //     </div>
    // )
}