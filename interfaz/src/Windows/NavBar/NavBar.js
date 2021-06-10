import React, {useState} from "react";
import { MenuItems } from "./MenuItems";
import {Link} from "react-router-dom";
import "./NavBar.css";

function Navbar() {
    const [clicked, setClick] = useState(false);

    const handleClick = () => setClick(!clicked);

    return (
        <nav className="Navbar">
            <h1 className="navbarLogo">Gimnasio Popeye</h1>
            <div className="menuIcon" onClick={handleClick}>
            </div>
            <ul className="navMenu">
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