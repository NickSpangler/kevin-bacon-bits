import React from 'react'
import { connect } from 'react-redux'
import ActorSelect from './ActorSelect'
import { setActor } from '../../redux/actions/filmographyActions'

function FilmographyChallenge() {
    return (
        <div>
            <h1>How well do you know your favorite actor's career?</h1>
            <ActorSelect />
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
        history: filmography.history
    }
}

export default connect(mapStateToProps, { setActor })(FilmographyChallenge)