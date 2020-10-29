import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Favorites from './components/Favorites';

import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/favorites" component={Favorites} />
      </Switch>
    </div>
  );
}

export default App;
