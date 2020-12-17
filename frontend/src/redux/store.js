import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import searchReducer from './reducers/searchReducer'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    search: searchReducer
});

const store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk))
    );

export default store;