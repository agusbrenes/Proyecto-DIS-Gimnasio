import React, {Component} from "react";
import axios from "axios";

class AdminManage extends Component {
    state = {
        is: ""
    }

    componentDidMount = async () => {
        if (this.props.match.params.is === "Admins"){
            await this.setState({
                is: "Administrador",
              });
        } else if (this.props.match.params.is === "Instructors"){
            await this.setState({
                is: "Instructor",
              });
        } else if (this.props.match.params.is === "Clients"){
            await this.setState({
                is: "Cliente",
              });
        } else if (this.props.match.params.is === "Services"){
            await this.setState({
                is: "Servicio",
              });
        } else {
            await this.setState({
                is: "Room",
              });
        }
    }

    click = (funct) => {
        if (funct === "Add"){
            if (this.state.is === "Administrador")
                window.location=("/register/admin");
            else if (this.state.is === "Cliente")
                window.location=("/register/client");
            else if (this.state.is === "Instructor")
                window.location=("/register/instructor");
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
                    window.location=("/deleteRoom");
            else
                window.location=("/deleteService");
        }
    }

    render() {
        return (
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
                    <button className="btn btn-primary" style={{width:"220px"}} onClick={() => {window.location=("/adminMenu")}}>
                        Regresar
                    </button>
                </div>
            </div>
        )
    }
}

export default AdminManage;