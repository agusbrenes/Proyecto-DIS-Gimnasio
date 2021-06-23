import React, {Component} from "react";
import axios from "axios";
import Navbar from "./NavBar/NavBar";

class ManageSessions extends Component {
    render() {
        return (
            <div>
                <Navbar/>
            <div className="adminMenu">
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => window.location=("/adminMenu/selectCalendar/admin")}>
                        Ver Calendario
                    </button>
                </div>
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-danger" onClick={() => window.location=("/adminMenu")} style={{marginTop:"20px",width:"220px"}}>
                        Regresar
                    </button>
                </div>
            </div>
            </div>
        )
    }
}

export default ManageSessions