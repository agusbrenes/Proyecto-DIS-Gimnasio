import React, {Component} from "react";

class InstructorMenu extends Component {
    render() {
        return (
            <div className="window menuClient">
                <h1 className="d-flex justify-content-center" style={{color:"black"}}>
                    Bienvenido
                </h1>
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => {window.location=("/modifyClient");}}>
                        Modificar Cuenta
                    </button>
                </div>
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => {}}>
                        Crear una Sesión
                    </button>
                </div>
            </div>
        )
    }
}

export default InstructorMenu