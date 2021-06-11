import React, {Component} from "react";
import Navbar from "./NavBar/NavBar";

class ClientMenu extends Component {
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
            <div className="window menuClient">
                <h1 className="d-flex justify-content-center" style={{color:"black"}}>
                    Bienvenido
                </h1>
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => {window.location=("/modifyClient/id");}}>
                        Modificar Cuenta
                    </button>
                </div>
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => {"/clientMenu/viewCalendar/id"}}>
                        Ver Calendario
                    </button>
                </div>
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => {window.location=("/newReservation")}}>
                        Hacer Reservación
                    </button>
                </div>
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => {}}>
                        Ver Reservaciones
                    </button>
                </div>
            </div>
            </div>
        )
    }
}

export default ClientMenu