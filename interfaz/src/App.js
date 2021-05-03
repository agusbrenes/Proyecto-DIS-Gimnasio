import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import "./App.css"
import GymMenu from './Windows/GymMenu';

function App() {
  return (
    <div>
      <Router>
          <Switch>
            <Route exact path = "/" component = {GymMenu}></Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
