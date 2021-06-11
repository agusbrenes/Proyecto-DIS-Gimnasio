import axios from "axios";
import React, {Component} from "react";
import "../App.css";
import Navbar from "./NavBar/NavBar";

const swal = require('sweetalert2');

class Login extends Component {
    state = {
        email: "",
        password: "",
        is: "Client",
        check: false,
        check2: false
    }

    //Función que actualiza los states
    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name] : value
        });
    }

    componentDidMount = () => {
        this.setState.is = "Client"
    }    

    change = () => {

        this.setState({
            check: document.getElementById("check").checked,
            check2:  document.getElementById("check2").checked
        })

        if (document.getElementById("check").checked && !document.getElementById("check2").checked){
            document.getElementById("check2").disabled="disabled"
            document.getElementById("check").disabled=""
            this.setState({is: "Admin"})
        } else if (!document.getElementById("check").checked && document.getElementById("check2").checked) {
            document.getElementById("check").disabled="disabled"
            document.getElementById("check2").disabled=""
            this.setState({is: "Instructor"})
        } else {
            document.getElementById("check").disabled=""
            document.getElementById("check2").disabled=""
            this.setState({is: "Client"})
        }
    }

    check = async (event) => {
        event.preventDefault();

        console.log(this.state);
        await axios({
            url: "/api/login"+this.state.is,
            method: "POST",
            data: {
                email: this.state.email,
                password: this.state.password
            }
        })
        .then((res) => {
            localStorage.setItem('token', JSON.stringify(res.data));
            if (this.state.is === "Admin")
                window.location=("/adminMenu")
            else if (this.state.is === "Instructor")
                window.location=("/instructorMenu")
            else 
                window.location=("/clientMenu")
        })
        .catch((err) => {
            swal.fire({
                title: 'No se pudo verificar sus credenciales',
                text: err.msg,
                icon: 'error'
            });
        })
    }

    render() {
        return (
            <div>
                <Navbar/>
            <div className="window">
                 <form onSubmit={this.check}>
                    <h3>Ingrese sus credenciales</h3>

                    <div className="form-group">
                        <label>Correo Electrónico</label>
                        <input type="email" className="form-control" name="email" placeholder="Enter email" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input type="password" className="form-control" name="password" placeholder="Enter password" onChange={this.handleChange}/>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="check" placeholder="#####" name="check" value={this.state.check}
                                onChange={this.change}/>
                                <label for="check">Soy Administrador</label>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="check2" placeholder="#####" name="check2" value={this.state.check2}
                                onChange={this.change}/>
                                <label for="check2">Soy Instructor</label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Verificar</button>
                </form>
            </div>
            </div>
        )
    }
}

export default Login