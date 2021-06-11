import React, {Component} from "react";
import axios from "axios";
import "../App.css"
import Navbar from "./NavBar/NavBar";

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
        temp: "",
        room: "",
        is: "",
        var: true,
        rooms: []
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
        const token = localStorage.getItem("token")
        console.log(token);
        if (token === null && this.props.match.params.is === "admin") {
            window.location=("/loginClient");
        }
        this.setState({
            is: this.props.match.params.is,
          });
        if (this.props.match.params.is === "Instructor"){
            this.getData();
            this.setState({var: false});
        }
    }

    getData = () => {
        axios({
            url: "/api/GetRooms",
            method: "GET",
        })
        .then( async (response) => {
            const data = response.data;
            await data.forEach((item) => {
                this.state.rooms.push(item.name);
            })
            this.setState({
                room: data[0].name
            }); 
        })
        .catch(() => {
            console.log("Hubo un error al buscar los Instructores");
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
        if (this.state.is === "Instructor"){
            if (this.state.temp == "Fijo")
                this.setState({var: false})
            else 
            this.setState({var: true})
            var user = {
                email: this.state.email,
                password: this.state.password,
                id: this.state.id,
                firstName: this.state.name,
                lastName: this.state.lastname,
                phone: this.state.phone,
                temp: this.state.temp,
                room: {name: this.state.room}
            }
        } else {
            var user = {
                email: this.state.email,
                password: this.state.password,
                id: this.state.id,
                firstName: this.state.name,
                lastName: this.state.lastname,
                phone: this.state.phone,
            }
        }
        console.log(user);
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
                    text: 'La cuenta a sido registrada existosamente',
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

    temp = () => {
        console.log(this.props.match.params.is);
        if (this.props.match.params.is === "Instructor"){
            return ( 
                <div>
                <div className="form-group">
                    <label>Contratación</label>
                    <select
                        name="temp"
                        className="form-control"
                        onChange={this.handleChange}
                    >
                        <option>Fijo</option>
                        <option>Temporal</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Room a asignar</label>
                    <select
                        name="room"
                        className="form-control"
                        onChange={this.handleChange}
                    >
                        {this.state.rooms.map((room,index) => 
                            <option key={index}>
                                {room}
                            </option>
                        )}
                    </select>
                </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <Navbar/>
            <div className={!this.state.var ? "Register" : "window"}>
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
                        {this.temp()}
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
            </div>
        )
    }
}

export default Register;