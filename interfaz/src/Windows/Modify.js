import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";
import Navbar from "./NavBar/NavBar";

class Modify extends Component {
    state = {
        name: "",
        lastname: "",
        email: "",
        id: "",
        phone: "",
        password: "",
        confirm: "",
        room: "",
        check: false,
        temp: "",
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



    componentDidMount = async () => {
        const token = localStorage.getItem("token")
        
        if (token === null) {
            window.location=("/loginClient");
        }
        if (this.props.match.params.is === "Admin"){
            this.setState({
                is: "Administrador"
            });
            await this.getData();
        } else if (this.props.match.params.is === "Instructor"){
            this.setState({
                is: "Instructor",
            });           
            await this.getRooms();
            await this.getData(); 
        } else if (this.props.match.params.is === "Client"){
            this.setState({
                is: "Cliente",
            });
            await this.getData();
        }
    }

    getRooms = async () => {
        await axios({
            url: "/api/GetRooms",
            method: "GET",
        })
        .then( async (response) => {
            const data = response.data;
            await data.forEach((item) => {
                this.state.rooms.push(item.name);
            })
        })
        .catch(() => {
            console.log("Hubo un error al buscar los Instructores");
        });
    }

    getData = async () => {
        const dato = {id: this.props.match.params.id }
        axios({
            url: "/api/Get"+this.props.match.params.is,
            method: "POST",
            data: dato,
        })
        .then((response) => {
            if (this.props.match.params.is === "Instructor"){
                this.setState({
                    name: response.data[0].firstName,
                    lastname: response.data[0].lastName,
                    email: response.data[0].email,
                    id: response.data[0].id,
                    phone: response.data[0].phone,
                    room: response.data[0].room.name,
                    temp: response.data[0].temp
                })
            } else {
                this.setState({
                    name: response.data[0].firstName,
                    lastname: response.data[0].lastName,
                    email: response.data[0].email,
                    id: response.data[0].id,
                    phone: response.data[0].phone,
                })
            }
        })
        .catch(() => {
            swal.fire({
                title: 'Ocurrio un problema al cargar los datos',
                icon: 'error'
            }).then(() => {
                window.history.back();
            });
        });
    }

    change = () => {
        this.setState({
            check: document.getElementById("check").checked
        })

        if (this.state.check){
            document.getElementById("password").disabled="disabled"
            document.getElementById("confirm").disabled="disabled"
        } else {
            document.getElementById("password").disabled=""
            document.getElementById("confirm").disabled=""
        }
    }

    modify = (event) => {
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
            if (this.state.temp === "Fijo")
                this.setState({var: false})
            else 
                this.setState({var: true})
            var user = {
                room: {name: this.state.room},
                email: this.state.email,
                password: this.state.password,
                id: this.state.id,
                firstName: this.state.name,
                lastName: this.state.lastname,
                phone: this.state.phone,
                isTemp: this.state.var,
                services: [],
                sessions: [],
            }
        } else if (this.state.is === "Cliente"){
            user = {
                email: this.state.email,
                password: this.state.password,
                id: this.state.id,
                firstName: this.state.name,
                lastName: this.state.lastname,
                phone: this.state.phone,
                status: "Al dia",
                reservations: [],
                subscriptions:[],
            }
        } else {
            user = {
                admRoom: {roomName: ""},
                email: this.state.email,
                password: this.state.password,
                id: this.state.id,
                firstName: this.state.name,
                lastName: this.state.lastname,
                phone: this.state.phone
            }
        }

        axios({
            url: "/api/Modify"+this.props.match.params.is,
            method: "POST",
            data: user
        })
        .then( (res) => {
            swal.fire({
                title: 'Listo!',
                text: 'Se modifico el ' + this.state.is + ' con éxito',
                icon: 'success'
            }).then(() => {
                window.location=("/adminMenu/show"+this.props.match.params.is);
            });
        })
        .catch( () => {
            swal.fire({
                title: 'Error',
                text: 'Ocurrio un problema, vuelva a intentarlo más tarde',
                icon: 'error'
            }).then(() => {
                window.location=("/adminMenu/show"+this.props.match.params.is);
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

    render () {
        return (
            <div>
                <Navbar/>
            <div className="window">
                <form onSubmit={this.modify}>
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
                        <input type="text" className="form-control" id="id" placeholder="#####" name="id" value={this.state.id} disabled= "disabled"
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label for="phone">Número Telefono</label>
                        <input type="text" className="form-control" id="phone" placeholder="#####" name="phone" value={this.state.phone}
                        onChange={this.handleChange}/>
                    </div>
                    {this.temp()}
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="check" placeholder="#####" name="check" value={this.state.check}
                        onChange={this.change}/>
                        <label for="check">Cambiar contraseña</label>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label for="password">Contraseña</label>
                            <input type="password" className="form-control" id="password" name="password" value={this.state.password}
                            onChange={this.handleChange} disabled="disabled"/>
                        </div>
                        <div className="col">
                            <label for="confirm">Confirmar Contraseña</label>
                            <input type="password" className="form-control" id="confirm" name="confirm" value={this.state.confirm}
                            onChange={this.handleChange} disabled="disabled"/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{marginTop:"20px"}}>
                        Modificar
                    </button>
                </form>
            </div>
            </div>
        )
    }
}

export default Modify;