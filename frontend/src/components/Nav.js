import '../css/Nav.css';
import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from 'antd'
import { connect } from 'react-redux';
import { SoundOutlined, SoundTwoTone } from '@ant-design/icons';
import { toggleSound } from '../redux/actions/settingsActions'
import useSound from 'use-sound';
import buttonDown from '../sounds/pop_1.mp3'
import buttonUp from '../sounds/pop_2.mp3'


function Nav(props) {
    const [playDown] = useSound(
        buttonDown,
        { volume: 0.25 }
      );
      const [playUp] = useSound(
        buttonUp,
        { volume: 0.25 }
      );
    //   const [playOff] = useSound(
    //     '/sounds/pop-up-off.mp3',
    //     { volume: 0.25 }
    //   );

    const soundOff = <SoundOutlined className='soundIcon' style={{color: 'grey'}} onClick={props.toggleSound} />
    const soundOn = <SoundTwoTone className='soundIcon' onClick={props.toggleSound} />
    const soundIcon = props.sound === true ? soundOn : soundOff

    return (
        <div className="demo">
            <div className="demo-nav">
                <Link to='/'>Home</Link>
                <Link to='/six-degrees-search'>Six Degrees Search</Link>
                <Link to='/six-degrees-challenge'>Six Degrees Challenge</Link>
                <Badge count={props.total_history} offset={[10, 10]} size="small">
                <Link to='/filmography-challenge' style={{fontSize: 'large'}}>Filmography Challenge</Link>
                </Badge>
                { soundIcon }
            </div>
            <div>
            </div>
        </div>
    )
}

const mapStateToProps = ({filmography, settings}) => {
    return ({
        total_history: filmography.total_history,
        sound: settings.sound
    })
}

export default connect(mapStateToProps, { toggleSound })(Nav)