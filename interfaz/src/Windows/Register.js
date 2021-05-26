import React, {Component} from "react";
import axios from "axios";
import "../App.css"

class Register extends Component {
    state = {
        name: "",
        lastname: "",
        email: "",
        id: "",
        phone: "",
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

    submit = (event) => {
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
            id: this.state.id,
            firstName: this.state.name,
            lastName: this.state.lastname,
            phone: this.state.phone,
        }
        axios({
            url: "",
            method: "POST",
            data: user
        })
    }

    render() {
        return (
            <div className="Register">
                <form onSubmit={this.submit}>
                    <h4 className="text-center">
                        Ingrese sus datos
                    </h4>
                    <div className="form-group">
                        <label for="email">Correo Electronico</label>
                        <input type="email" className="form-control" id="email" placeholder="nombre@ejemplo.com"/>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label for="name">Nombre</label>
                            <input type="text" className="form-control" id="name" placeholder="Nombre"/>
                        </div>
                        <div className="col">
                            <label for="lastname">Apellido</label>
                            <input type="text" className="form-control" id="lastname" placeholder="Apellido"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="id">Cédula</label>
                        <input type="text" className="form-control" id="id" placeholder="#####"/>
                    </div>
                    <div className="form-group">
                        <label for="phone">Número Telefono</label>
                        <input type="text" className="form-control" id="phone" placeholder="#####"/>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label for="password">Contraseña</label>
                            <input type="password" className="form-control" id="password"/>
                        </div>
                        <div className="col">
                            <label for="confirm">Confirmar Contraseña</label>
                            <input type="password" className="form-control" id="confirm"/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{marginTop:"20px"}}>
                        Registrarse
                    </button>
                </form>
            </div>
        )
    }
}

export default Register;