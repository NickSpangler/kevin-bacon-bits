import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import searchReducer from './reducers/searchReducer'
import filmographyReducer from './reducers/filmographyReducer'
import settingsReducer from './reducers/settingsReducer'
import sixDegreesChallengeReducer from './reducers/sixDegreesChallengeReducer'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    search: searchReducer,
    sixDegreesChallenge: sixDegreesChallengeReducer,
    filmography: filmographyReducer,
    settings: settingsReducer
});

const store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk))
    );

export default store;