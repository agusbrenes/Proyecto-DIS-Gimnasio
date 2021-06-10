import React, {Component} from "react";
import axios from "axios";
import "../App.css"

const swal = require('sweetalert2')

class Register extends Component {
    state = {
        name: "",
        lastname: "",
        email: "",
        id: "",
        phone: "",
        password: "",
        confirm: "",
        is: "",
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

    componentDidMount = async () => {
        await this.setState({
            is: this.props.match.params.is,
          });
    }

    submit = (event) => {
        event.preventDefault();

        if(this.state.name === "" || this.state.lastname === "" || this.state.email === "" || this.state.id === "" || this.state.phone === "" ){
            swal.fire({
                title: 'Debe rellenar todos los campos',
                icon: 'warning'
            })
            return;
        }

        if (this.state.password !== this.state.confirm){
            swal.fire({
                title: 'La contraseñas no coinciden',
                icon: 'warning'
            })
            return;
        }

        console.log("khe");

        const user = {
            email: this.state.email,
            password: this.state.password,
            id: this.state.id,
            firstName: this.state.name,
            lastName: this.state.lastname,
            phone: this.state.phone,
        }
        axios({
            url: "/api/New"+this.state.is,
            method: "POST",
            data: user
        })
        .then( (res) => {
            if (res.data.msg === true) {
                swal.fire({
                    title: 'Error',
                    text: 'Ya se encuentra una cuenta asociada a este correo.',
                    icon: 'error'
                }).then(() => {
                    window.location.reload(false);
                });
                
            } else {
                swal.fire({
                    title: 'Listo!',
                    text: 'Su cuenta a sido registrada existosamente',
                    icon: 'success'
                }).then(() => {
                    window.history.back();
                });
            }
        })
        .catch( (err) => {
            swal.fire({
                title: 'Ocurrio un problema al crear el usuario',
                text: err.message,
                icon: 'error'
            });
        })
    }

    render() {
        return (
            <div className="Register window">
                <form onSubmit={this.submit}>
                    <h4 className="text-center">
                        Ingrese sus datos
                    </h4>
                    <div className="form-group">
                        <label for="email">Correo Electronico</label>
                        <input type="email" className="form-control" id="email" placeholder="nombre@ejemplo.com" name="email" value={this.state.email}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label for="name">Nombre</label>
                            <input type="text" className="form-control" id="name" placeholder="Nombre" name="name" value={this.state.name}
                            onChange={this.handleChange}/>
                        </div>
                        <div className="col">
                            <label for="lastname">Apellido</label>
                            <input type="text" className="form-control" id="lastname" placeholder="Apellido" name="lastname" value={this.state.lastname}
                            onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="id">Cédula</label>
                        <input type="text" className="form-control" id="id" placeholder="#####" name="id" value={this.state.id}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label for="phone">Número Telefono</label>
                        <input type="text" className="form-control" id="phone" placeholder="#####" name="phone" value={this.state.phone}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label for="password">Contraseña</label>
                            <input type="password" className="form-control" id="password" name="password" value={this.state.password}
                            onChange={this.handleChange}/>
                        </div>
                        <div className="col">
                            <label for="confirm">Confirmar Contraseña</label>
                            <input type="password" className="form-control" id="confirm" name="confirm" value={this.state.confirm}
                            onChange={this.handleChange}/>
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