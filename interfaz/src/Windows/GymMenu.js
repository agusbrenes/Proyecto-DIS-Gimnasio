import React, {Component} from "react";
import "../App.css";
import Navbar from "./NavBar/NavBar";

class GymMenu extends Component {
    componentDidMount = () => {
        localStorage.removeItem("token");
    }

    render() {
        return (
            <div>
                <Navbar/>
            <h1 className="GymMenu">
                Menu
            </h1>
            </div>
        )
    }
}

export default GymMenu;