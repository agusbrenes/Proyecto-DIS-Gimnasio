import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import "./App.css"
import AdminManage from './Windows/AdminManage';
import AdminMenu from './Windows/AdminMenu';
import GymMenu from './Windows/GymMenu';
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
import NewSession from './Windows/NewSession';
import NewReservation from './Windows/NewReservation';
import ManageSessions from './Windows/ManageSessions';
import SelectCalendar from './Windows/SelectCalendar';
import ViewCalendar from './Windows/ViewCalendar';
import SelectCalendarIns from './Windows/SelectCalendarIns';
import ViewCalendarIns from './Windows/ViewCalendarIns';
import Buzon from './Windows/Buzon';
import ModifySession from './Windows/ModifySession';

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
        {//<Route exact path="/clientMenu/viewCalendar/:id" component={MyCalendar}/>}
}
        <Route exact path="/instructorMenu" component={InstructorMenu}/>
        <Route exact path="/instructorMenu/selectCalendar/viewCalendar/:room/:capacity/:begin/:end/:year/:month/:day/:is/newSession" component={NewSession}/>
        <Route exact path="/adminMenu/selectCalendar/viewCalendar/:room/:capacity/:begin/:end/:year/:month/:day/:is/newSession" component={NewSession}/>
        <Route exact path="/adminMenu/selectCalendar/:is" component={SelectCalendar}/>
        <Route exact path="/instructorMenu/selectCalendar/:is" component={SelectCalendarIns}/>
        <Route exact path="/adminMenu/selectCalendar/viewCalendar/:room/:capacity/:begin/:end/:year/:month/:day/:is" component={ViewCalendar}/>
        <Route exact path="/instructorMenu/selectCalendar/viewCalendar/:room/:capacity/:begin/:end/:year/:month/:day/:is" component={ViewCalendarIns}/>
        <Route exact path="/instructorMenu/selectCalendar/viewCalendar/:room/:capacity/:begin/:end/:year/:month/:day/:initial/:total/:service/:is/modifySession" component={ModifySession}/>
        <Route exact path="/newReservation" component={NewReservation}/>
        <Route exact path="/buzon" component={Buzon}/>
      </Switch>
    </Router>
  );
}

export default App;
