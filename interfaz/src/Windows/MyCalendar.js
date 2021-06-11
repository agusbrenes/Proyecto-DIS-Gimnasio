import React, {Component} from "react";
import axios from "axios";
import Navbar from "./NavBar/NavBar";

class MyCalendar extends Component {
    componentDidMount = () => {
        const token = localStorage.getItem("token")
        console.log(token);
        if (token === null) {
            window.location=("/loginClient");
        }
    }

    render() {
        return (
            <div>
                <Navbar/>
            </div>
        )
    }
}

export default MyCalendar