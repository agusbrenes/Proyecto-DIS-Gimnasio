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
import ModifyRoom from './Windows/ModifyRoom';
import ClientMenu from './Windows/ClientMenu';
import ShowData from './Windows/ShowData';
import ShowService from './Windows/ShowService';
import NewRoom from './Windows/NewRoom';
import ShowRooms from './Windows/ShowRooms';
import DeleteRoom from './Windows/DeleteRoom';
import InstructorMenu from './Windows/InstructorMenu';
import MyCalendar from './Windows/MyCalendar';
import NewSession from './Windows/NewSession';
import NewReservation from './Windows/NewReservation';
import ManageSessions from './Windows/ManageSessions';

function App() {
  return (
    <Router>
      
      <Switch>
        <Route exact path="/" component={GymMenu} />
        <Route exact path="/register/:is" component={Register} />
        <Route exact path="/login:is" component={Login}/>
        <Route exact path="/adminMenu" component={AdminMenu}/>
        <Route exact path="/adminMenu/manage:is" component={AdminManage}/>
        <Route exact path="/adminMenu/sessionManage" component={ManageSessions}/>
        <Route exact path="/adminMenu/show:is" component={ShowData}/>
        <Route exact path="/adminMenu/viewRoom" component={ShowRooms}/>
        <Route exact path="/adminMenu/viewRoom/:name" component={ModifyRoom}/>
        <Route exact path="/modify:is/:id" component={Modify}/>
        <Route exact path="/newService" component={NewService}/>
        <Route exact path="/newRoom" component={NewRoom}/>
        <Route exact path="/adminMenu/changeService" component={ShowService}/>
        <Route exact path="/adminMenu/changeService/:name" component={ModifyService}/>
        <Route exact path="/delete:is" component={Delete}/>
        <Route exact path="/eraseRoom" component={DeleteRoom}/>
        <Route exact path="/clientMenu" component={ClientMenu}/>
        <Route exact path="/clientMenu/viewCalendar/:id" component={MyCalendar}/>
        <Route exact path="/instructorMenu" component={InstructorMenu}/>
        <Route exact path="/instructorMenu/newSession/:is" component={NewSession}/>
        <Route exact path="/adminMenu/newSession/:is" component={NewSession}/>
        <Route exact path="/newReservation" component={NewReservation}/>
      </Switch>
    </Router>
  );
}

export default App;
