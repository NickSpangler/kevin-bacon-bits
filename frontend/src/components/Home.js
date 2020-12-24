import React from 'react'
import { Typography, Divider } from 'antd';
import '../css/animista.css'
import Logo from '../images/edited-logo2.png'

const { Title, Paragraph, Text} = Typography;


export default function Home() {
    return (
        <div className='home-container'>
            <div className='home-content'>
            <br></br><br></br><br></br>
                <div id="f1_container">
                    <div id="f1_card" class="shadow">
                        <div class="front face">
                        <img src={ Logo } width='600px'></img>
                        </div>
                        <div class="back face center">
                            {/* <p>This is nice for exposing more information about an image.</p>
                            <p>Any content can go here.</p> */}
            <Typography>
                <Title>Welcome to Kevin Bacon Bits</Title>
                <Paragraph>
                    At KBB we know the bits are just good as the whole strip... if not better!
                    So why not have a taste?
                </Paragraph>
                <Paragraph>
                    <Text strong underline>Six Degrees Search</Text> you can search any two actors in our database 
                    and see if they can be connected with six degrees of separation or less.
                </Paragraph>
                <Paragraph>
                    <Text strong underline>Six Degrees Challenge</Text> lets you choose an actor and a number of 
                    degrees you want to be challenged by, and we'll tell you who to connect them with!
                </Paragraph>
                <Paragraph>
                    <Text strong underline>Filmography Challenge</Text> let's you choose an actor and we'll 
                    test your knowledge of their filmography by making you select posters from the films they've been in. Good luck!
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
