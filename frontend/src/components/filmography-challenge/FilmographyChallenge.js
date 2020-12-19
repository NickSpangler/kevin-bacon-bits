import React from 'react'
import { connect } from 'react-redux'
import ActorSelect from './ActorSelect'
import { setActor, getPossibleMovies } from '../../redux/actions/filmographyActions'
import { PropertySafetyFilled } from '@ant-design/icons'
import OptionsContainer from './OptionsContainer'

function FilmographyChallenge(props) {
    return (
        <div>
            <h1>How well do you know your favorite actor's career?</h1>
            <ActorSelect setActor={props.setActor} 
                        actor={props.actor} 
                        movie={props.current_movie} 
                        challenge_active={props.challenge_active}
                        getPossibleMovies={props.getPossibleMovies}/>
            <OptionsContainer />
        </div>
    )
}

const mapStateToProps = ({ filmography }) => {
    return {
        actor: filmography.actor,
        actor_movies: filmography.actor_movies,
        current_movie: filmography.current_movie,
        possible_answers: filmography.possible_answers,
        round_result: filmography.round_result,
        history: filmography.history,
        challenge_active: filmography.challenge_active
    }
}

export default connect(mapStateToProps, { setActor, getPossibleMovies })(FilmographyChallenge)