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
            <h4 className="GymMenu">
                Bienvenido
            </h4>
            </div>
        )
    }
}

export default GymMenu;