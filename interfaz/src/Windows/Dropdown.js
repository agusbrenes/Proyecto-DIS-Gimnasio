import React, {useState} from "react";
//import { DropItems } from "./DropItems";
import {Link} from "react-router-dom";
import "./Styles.css";

function Dropdown() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return(
        <ul onClick={handleClick} className={click ? 'dropdownMenu clicked' : 'dropdownMenu'}>
            <li>
                <Link className="dropdownLink">
                    Prueba
                </Link>
            </li>
            <li>
                <Link className="dropdownLink">
                    Prueba 2
                </Link>
            </li>
        </ul>
    )
}

export default Dropdown;