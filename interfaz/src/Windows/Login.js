import axios from "axios";
import React, {Component} from "react";
import "../App.css";

const swal = require('sweetalert2');

class signUp extends Component {
    state = {
        email: "",
        password: ""
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

    check = (event) => {
        event.preventDefault();
        
        axios({
            url: "/api/login",
            method: "POST",
            data: {
                email: this.state.email,
                password: this.state.password
            }
        })
        .then((res) => {
            window.location("/");
        })
        .catch((err) => {
            swal.fire({
                title: 'No se pudo verificar sus credenciales',
                text: err.message,
                icon: 'error'
            });
        })
    }

    render() {
        return (
            <div className="window">
                <form onSubmit={this.check}>
                    <h4 className="text-center">
                        Ingrese sus credenciales
                    </h4>
                    <div className="form-group">
                        <label for="email">Correo Electronico</label>
                        <input type="email" className="form-control" id="email" placeholder="nombre@ejemplo.com"/>
                    </div>
                    <div className="form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" className="form-control" id="password"/>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{marginTop:"20px"}}>
                        Verificar
                    </button>
                </form>
            </div>
        )
    }
}

export default signUp