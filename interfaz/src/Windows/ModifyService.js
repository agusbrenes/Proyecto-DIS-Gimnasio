import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";
import Navbar from "./NavBar/NavBar";

class ModifyService extends Component {
    state = {
        id: "",
        name: "",
        capacity: "",
        room: "",
        instructorO: "",
        instructor: "",
        nums: [],
        rooms: [],
        list: []
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
        if (token === null) {
            window.location=("/loginClient");
        }
        this.getData();
    }

    fill = () => {
        if (this.state.nums.length === 0){
            for(var j=1; j <= 30; j++){
                this.state.nums.push(j);
            }
        }
    }

    getData = async () => {
        await axios({
            url: "/api/GetService",
            method: "POST",
            data: {name: this.props.match.params.name}
        })
        .then( (response) => {
            const data = response.data;
            this.setState({
                id: data[0].id,
                name: data[0].name,
                capacity: data[0].room.capacity,
                room: data[0].room.name, 
                instructorO: {
                    name: data[0].instructors[0].firstName,
                    lastName: data[0].instructors[0].lastName,
                    id: data[0].instructors[0].id
                },
                instructor: data[0].instructors[0].firstName + " " + data[0].instructors[0].lastName
            });
            this.getRooms();
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

    getRooms = async () => {
        await axios({
            url: "/api/GetRooms",
            method: "GET",
        })
        .then( async (response) => {
            const data = response.data;
            await data.forEach((item) => {
                const info = {
                    name: item.name,
                    capacity: item.capacity
                }
                this.state.rooms.push(info);
            })
            this.setState({
                room: data[0].name + " - Capacidad: " + data[0].capacity
            }); 
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


    submit = (event) => {
        event.preventDefault();

        const data = {
            name: this.state.name,
            capacity: this.state.capacity,
            instructors: {
                id: this.state.instructorO.id,
                first_name: this.state.instructorO.name,
                last_name: this.state.instructorO.lastName
            },
            room: {
                name: this.state.room,
                capacity: this.state.capacity
            },
            sessions: []
        }

        console.log(data);

        axios({
            url: "/api/ModifyService",
            method: "POST",
            data: data
        })
        .then((res) => {
            if (res.data.msg === true) {
                swal.fire({
                    title: 'Error',
                    text: 'Ya se encuentra un Servicio con este nombre',
                    icon: 'error'
                })                
            } else {
                swal.fire({
                    title: 'Listo!',
                    text: 'Se a Modificado el Servicio existosamente',
                    icon: 'success'
                }).then(() => {
                    window.history.back();
                });
            }
        })
        .catch( (err) => {
            swal.fire({
                title: 'Ocurrio un problema al modificar el Servicio',
                text: err.message,
                icon: 'error'
            });
        })
    }

    render() {
        return (
            <div>
                <Navbar/>
            <div className="window">
                {this.fill()}
                <form onSubmit={this.submit}>
                    <h4 className="text-center">
                        Ingrese los nuevos datos del servicio para modificar
                    </h4>
                    <div className="form-group">
                        <label for="description">Nombre</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name"
                            name="name" 
                            value={this.state.name}
                            onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label for="description">Capacidad de personas</label>
                        <select
                            name="capacity"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.capacity}
                        >
                            {this.state.nums.map((num,index) => 
                                <option key={index}>
                                    {num}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="description">Instructor del servicio</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="instructor"
                            name="instructor" 
                            value={this.state.instructor}
                            onChange={this.handleChange}
                            disabled="disabled"/>
                    </div>
                    <div className="form-group">
                        <label for="description">Room del servicio</label>
                        <select
                            id="room"
                            name="room"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.room}
                        >
                            {this.state.rooms.map((room,index) => 
                                <option key={index}>
                                    {room.name} - Capacidad: {room.capacity}
                                </option>
                            )}
                        </select>
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

export default ModifyService