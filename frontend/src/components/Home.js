import React from 'react'
import { Typography, Divider } from 'antd';
import '../css/animista.css'
import Logo from '../images/edited-logo2.png'

const { Title, Paragraph, Text} = Typography;


export default function Home() {
    return (
        <div className='home-container'>
            <div className='home-content fade-in'>
            <br></br><br></br><br></br>
            <br></br><br></br><br></br>
            <br></br><br></br>
                <div id="f1_container">
                    <div id="f1_card" class="shadow">
                        <div class="front face">
                        <img src={ Logo } width='600px'></img>
                        </div>
                        <div class="back face center">
                            <br></br>
                            <Typography>
                                <Title>Welcome to Kevin Bacon Bits</Title>
                                <br></br>
                                <Paragraph>
                                    <Text strong underline>Six Degrees Search:</Text> search any two actors in our database 
                                    and see if they can be connected with six degrees of separation or less.
                                </Paragraph>
                                <Paragraph>
                                    <Text strong underline>Six Degrees Challenge:</Text> choose an actor and a number of 
                                    degrees you want to be challenged by, and we'll tell you who to connect them with.
                                </Paragraph>
                                <Paragraph>
                                    <Text strong underline>Filmography Challenge:</Text> choose an actor and we'll 
                                    test your knowledge of their filmography by making you select posters from the films they've been in.
                                </Paragraph>
                                <Paragraph>
                                    Good luck!
                                </Paragraph>
                            </Typography>
                        </div>
                    </div>
                </div>












            {/* <div className='logo-container heartbeat'>
                <img src={ Logo } width='600px'></img>
            </div>
            <div> */}
            {/* </div> */}
            </div>
        </div>
    )
}
