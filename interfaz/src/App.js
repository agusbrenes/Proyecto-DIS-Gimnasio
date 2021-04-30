import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import "./App.css"
import GimMenu from './Windows/GimMenu';

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path = "/" component = {GimMenu}></Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
