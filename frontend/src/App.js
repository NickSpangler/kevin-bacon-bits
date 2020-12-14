import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import SixDegreesSearch from './components/six-degrees-search/SixDegreesSearch';
import SixDegreesChallenge from './components/six-degrees-challenge/SixDegreesChallenge';
import FilmographyChallenge from './components/filmography-challenge/FilmographyChallenge';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/six-degrees-search' component={SixDegreesSearch} />
          <Route exact path='/six-degrees-challenge' component={SixDegreesChallenge} />
          <Route exact path='/filmography-challenge' component={FilmographyChallenge} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
