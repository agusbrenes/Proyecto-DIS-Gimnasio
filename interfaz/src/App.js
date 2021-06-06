import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import "./App.css"
import AdminManage from './Windows/AdminManage';
import AdminMenu from './Windows/AdminMenu';
import GymMenu from './Windows/GymMenu';
import Navbar from './Windows/NavBar/NavBar';
import Register from './Windows/Register';
import Login from './Windows/Login';
import Modify from './Windows/Modify';
import NewService from './Windows/NewService';
import Delete from './Windows/Delete';
import ModifyService from './Windows/ModifyService';
import ClientMenu from './Windows/ClientMenu';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={GymMenu} />
        <Route exact path="/register/:is" component={Register} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/adminMenu" component={AdminMenu}/>
        <Route exact path="/adminMenu/manage:is" component={AdminManage}/>
        <Route exact path="/modify:is" component={Modify}/>
        <Route exact path="/newService" component={NewService}/>
        <Route exact path="/changeService" component={ModifyService}/>
        <Route exact path="/delete:is" component={Delete}/>
        <Route exact path="/clientMenu" component={ClientMenu}/>
      </Switch>
    </Router>
  );
}

export default App;
