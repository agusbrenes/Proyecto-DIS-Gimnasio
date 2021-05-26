import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import "./App.css"
import GymMenu from './Windows/GymMenu';
import Navbar from './Windows/NavBar/NavBar';
import Register from './Windows/Register';
import signUp from './Windows/SignUp';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={GymMenu} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/signUp" component={signUp}/>
      </Switch>
    </Router>
  );
}

export default App;
