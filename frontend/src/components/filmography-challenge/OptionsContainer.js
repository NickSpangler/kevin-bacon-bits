import React from 'react'
import { Space, Popconfirm } from 'antd';
import useSound from 'use-sound';
import Win from '../../sounds/zapsplat_multimedia_game_sound_synth_bright_pluck_digital_award_achievement_008_40718.mp3'
import Fail from '../../sounds/multimedia_game_sound_synth_tone_bold_fail_52993.mp3'
import Fanfare from '../../sounds/final_fanfare.mp3'

const OptionsContainer = (props) => {



    const [winSound] = useSound(Win, { volume: 0.25 });
    const [failSound] = useSound(Fail, { volume: 0.25 });
    const [finalFanfare] = useSound(Fanfare, { volume: 0.25 });

    const makeChoice = (choice) => {
        if (choice === props.film.title) {
            props.actor_movies.length === 0 ? finalFanfare() : winSound()
            props.rightAnswer()
        } else {
            failSound();
            props.wrongAnswer()
        }
    }

    if (props.possible_answers.length === 0) {
        return (
            <></>
    )} else {
        return (
            <>
                <p>Which of these films featured {props.actor.name} in {props.film.release_year}?</p>
                <Space>
                    {props.possible_answers.map( option => {
                        return (
                            <div className='slide-in-elliptic-top-fwd'>
                            <Popconfirm title={`Are you sure ${props.actor.name.split(' ')[0]} was in ${option.title}?`} 
                            okText="Yes" 
                            cancelText="No" 
                            placement="bottom"
                            onConfirm={() => makeChoice(option.title)}
                            data='you found me'>
                                <img src={`https://image.tmdb.org/t/p/w200${option.poster_path}`} height='250px'></img>
                            </Popconfirm>
                            </div>)}
                        )
                    }
                </Space>
            </>
        )
    }
}

export default OptionsContainer
