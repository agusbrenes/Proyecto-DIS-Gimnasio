import React, {useState} from "react";
import { MenuItems } from "./MenuItems";
import {Link} from "react-router-dom";
import "./NavBar.css";
import Dropdown from "../Dropdown";

function Navbar() {
    const [clicked, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => setClick(!clicked);

    const onMouseEnter = () => {
        setDropdown(true);
    };

    const onMouseLeave = () => {
        setDropdown(false);        
    };

    return (
        <nav className="Navbar">
            <h1 className="navbarLogo">Gimnasio Popeye</h1>
            <div className="menuIcon" onClick={handleClick}>
            </div>
            <ul className="navMenu">
                <li className="navItem" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                   <Link to="/" className="navLinks" onClick={handleClick}>
                        Services <i className="fas fa-caret-down"></i>
                   </Link> 
                   {dropdown && <Dropdown/>}
                </li>
                {MenuItems.map((item, index) => {
                    return (
                        <li className="navItem" key={index}>
                            <Link to={item.url} className={item.cName} onClick={handleClick}>
                                {item.title}
                            </Link>
                        </li>
                    )
                })}        
            </ul>
        </nav>
    )
}

export default Navbar;