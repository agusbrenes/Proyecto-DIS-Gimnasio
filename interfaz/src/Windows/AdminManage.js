import React, {Component} from "react";
import Navbar from "./NavBar/NavBar";

class AdminManage extends Component {
    state = {
        is: ""
    }

    componentDidMount = () => {
        const token = localStorage.getItem("token")
        
        if (token === null) {
            window.location=("/loginClient");
        }
        if (this.props.match.params.is === "Admins"){
            this.setState({
                is: "Administrador",
              });
        } else if (this.props.match.params.is === "Instructors"){
            this.setState({
                is: "Instructor",
              });
        } else if (this.props.match.params.is === "Clients"){
            this.setState({
                is: "Cliente",
              });
        } else if (this.props.match.params.is === "Services"){
            this.setState({
                is: "Servicio",
              });
        } else {
            this.setState({
                is: "Room",
              });
        }
    }

    click = (funct) => {
        if (funct === "Add"){
            if (this.state.is === "Administrador")
                window.location=("/register/Admin");
            else if (this.state.is === "Cliente")
                window.location=("/register/Client");
            else if (this.state.is === "Instructor")
                window.location=("/register/Instructor");
            else if (this.state.is === "Room")
                    window.location=("/newRoom");
            else
                window.location=("/newService");
        } else if (funct === "Modify"){
            if (this.state.is === "Administrador")
                window.location=("/adminMenu/showAdmin");
            else if (this.state.is === "Cliente")
                window.location=("/adminMenu/showClient");
            else if (this.state.is === "Instructor")
                window.location=("/adminMenu/showInstructor");
            else if (this.state.is === "Room")
                window.location=("/adminMenu/viewRoom");
            else
                window.location=("/adminMenu/changeService");
        } else {
            if (this.state.is === "Administrador")
                window.location=("/deleteAdmin");
            else if (this.state.is === "Cliente")
                window.location=("/deleteClient");
            else if (this.state.is === "Instructor")
                window.location=("/deleteInstructor");
            else if (this.state.is === "Room")
                    window.location=("/eraseRoom");
            else
                window.location=("/deleteService");
        }
    }

    render() {
        return (
            <div>
                <Navbar/>
            <div className="adminMenu">
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => this.click("Add")}>
                        Añadir {this.state.is}
                    </button>
                </div>
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => this.click("Modify")}>
                        Modificar {this.state.is}
                    </button>
                </div>
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => this.click("Delete")}>
                        Eliminar {this.state.is}
                    </button>
                </div>
                <div className="d-flex justify-content-center" style={{marginTop:"35px"}}>
                    <button className="btn btn-danger" style={{width:"220px"}} onClick={() => {window.location=("/adminMenu")}}>
                        Regresar
                    </button>
                </div>
            </div>
            </div>
        )
    }
}

export default AdminManage;