import React, {Component} from "react";
import axios from "axios";

class AdminMenu extends Component {
    render() {
        return (
            <div className="adminMenu">
                <h1 className="d-flex justify-content-center" style={{color:"black"}}>
                    Bienvenido
                </h1>
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => {window.location=("/adminMenu/manageAdmins")}}>
                        Gestionar Administradores
                    </button>
                </div>
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => {window.location=("/adminMenu/manageInstructors")}}>
                        Gestionar Instructores
                    </button>
                </div>
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => {window.location=("/adminMenu/manageClients")}}>
                        Gestionar Clientes
                    </button>
                </div>
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => {window.location=("/adminMenu/manageServices")}}>
                        Gestionar Servicios
                    </button>
                </div>
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => {window.location=("/adminMenu/manageRooms")}}>
                        Gestionar Rooms
                    </button>
                </div>
            </div>
        )
    }
}

export default AdminMenu;
