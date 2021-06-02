import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import "./App.css"
import AdminManage from './Windows/AdminManage';
import AdminMenu from './Windows/AdminMenu';
import GymMenu from './Windows/GymMenu';
import Navbar from './Windows/NavBar/NavBar';
import Register from './Windows/Register';
import Login from './Windows/Login';
import ModifyClient from './Windows/ModifyClient';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={GymMenu} />
        <Route exact path="/register/:is" component={Register} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/adminMenu" component={AdminMenu}/>
        <Route exact path="/adminMenu/adminManage" component={AdminManage}/>
        <Route exact path="/modifyClient" component={ModifyClient}/>
      </Switch>
    </Router>
  );
}

export default App;
