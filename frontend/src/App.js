import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav'
import Home from './components/Home';
import SixDegreesSearch from './components/six-degrees-search/SixDegreesSearch';
import SixDegreesChallenge from './components/six-degrees-challenge/SixDegreesChallenge';
import FilmographyChallenge from './components/filmography-challenge/FilmographyChallenge';
import { Helmet } from 'react-helmet'


function App() {
  return (
    <div className="App">
      <Helmet>
          <title>Kevin Bacon Bits</title>
      </Helmet>
      <Router>
        <Nav />
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