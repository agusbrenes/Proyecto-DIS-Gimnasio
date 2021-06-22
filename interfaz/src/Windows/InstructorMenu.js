import React, {Component} from "react";
import Navbar from "./NavBar/NavBar";

class InstructorMenu extends Component {
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
            <div className="window menuInstru">
                <h1 className="d-flex justify-content-center " style={{color: "#87afff", webkitTextStroke: "1px black"}}>
                    Bienvenido
                </h1>
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => {window.location=("/modifyInstructor/id")}}>
                        Modificar Cuenta
                    </button>
                </div>
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => {window.location=("/instructorMenu/newSession/instructor")}}>
                        Crear una Sesión
                    </button>
                </div>
            </div>
        </div>
        )
    }
}

export default InstructorMenu