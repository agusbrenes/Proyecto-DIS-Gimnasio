import React, {Component} from "react";
import axios from "axios";

class AdminManage extends Component {
    state = {
        is: ""
    }

    render() {
        return (
            <div className="adminMenu">
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => {
                        this.props.history.push("/register/" + "admin")}}>
                        Añadir Administrador
                    </button>
                </div>
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => { }}>
                        Modificar Administrador
                    </button>
                </div>
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => { }}>
                        Eliminar Administrador
                    </button>
                </div>
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => {window.location=("/adminMenu")}}>
                        Regresar
                    </button>
                </div>
            </div>
        )
    }
}

export default AdminManage;