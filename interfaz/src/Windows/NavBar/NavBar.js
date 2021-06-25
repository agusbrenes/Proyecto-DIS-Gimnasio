import React, {Component} from "react";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default class Navbar extends Component {
    state = {
        clicked: false,
        setClick: false,
        show: false
    }

    componentDidMount = () => {
        const token = localStorage.getItem("token")
        if (token === null) {
            this.setState({show: true})
        } else {
            this.setState({show: false})
        }
    }

    handleClick = () => this.setState.setClick = !this.state.clicked;

    render(){
    return (
        <nav className="Navbar">
            <h1 className="navbarLogo">Gimnasio Popeye</h1>
            <div className="menuIcon" onClick={this.handleClick}>
            </div>
            <ul className="navMenu">
                
                {this.state.show ? MenuItems.map((item, index) => {
                    return (
                        <li className="navItem" key={index}>
                            <Link to={item.url} className={item.cName} onClick={this.handleClick}>
                                {item.title}
                            </Link>
                        </li>
                    )
                }) : 
                    <li className="navItem" key="1">
                        <Link className="navLinks" onClick={() => window.location=("/buzon")}>
                            Buzón
                        </Link>
                        <Link className="navLinks" onClick={() => window.location=("/")}>
                            Logout
                        </Link>
                    </li>
                }        
            </ul>
        </nav>
    )
    }
}
