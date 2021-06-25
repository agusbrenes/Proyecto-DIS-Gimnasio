import React, {Component} from "react";
import axios from "axios";
import Navbar from "./NavBar/NavBar";

const swal = require('sweetalert2');

class NewService extends Component {
    state = {
        name: "",
        capacity: "",
        room: "",
        instructor: "",
        nums: [],
        instructors: [],
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
        
        if (token === null) {
            window.location=("/loginClient");
        }
        this.getInstructors();
        this.getRooms();
    }

    fill = () => {
        if(this.state.nums.length === 0){
            for(var j=1; j <= 30; j++){
                this.state.nums.push(j);
            }
        }
    }

    getInstructors = () => {
        axios({
            url: "/api/GetInstructors",
            method: "GET",
        })
        .then( async (response) => {
            const data = response.data;
            await data.forEach((item) => {
                const info = {
                    name: item.firstName,
                    lastname: item.lastName,
                    email: item.email,
                    id: item.id,
                    phone: item.phone,
                }
                this.state.instructors.push(info);
            });
            this.setState({
                instructor: data[0].id + " - " + data[0].firstName + data[0].lastName
            })
        })
        .catch(() => {
            console.log("Hubo un error al buscar los Instructores");
        });
    }

    getRooms = () => {
        axios({
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
            console.log("Hubo un error al buscar los Rooms");
        });
    }

    submit = (event) => {
        event.preventDefault();

        var index = document.form.instructor.selectedIndex;
        var index2 = document.form.room.selectedIndex;

        const data = {
            name: this.state.name,
            instructor: {
                id: this.state.instructors[index].id,
                firstName: this.state.instructors[index].name,
                lastName: this.state.instructors[index].lastname
            },
            room: {
                name: this.state.rooms[index2].name,
                capacity: this.state.rooms[index2].capacity 
            }
        }

        console.log(data);

        axios({
            url: "/api/NewService",
            method: "POST",
            data: data
        })
        .then(() => {
            swal.fire({
                title: 'Listo!',
                text: 'Se a creado el servicio',
                icon: 'success'
            }).then(() => {
                window.history.back();
            });
        })
        .catch(() => {
            swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error al crear el servicio',
                icon: 'error'
            })
        })
    }

    render() {
        return (
            <div>
                <Navbar/>
            <div className="window">
                {this.fill()}
                <form onSubmit={this.submit} name="form">
                    <h4 className="text-center">
                        Ingrese los datos del nuevo servicio
                    </h4>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input type="text" className="form-control" id="description" placeholder="Nombre del servicio" name="name" value={this.state.name}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Instructor del servicio</label>
                        <select
                            name="instructor"
                            className="form-control"
                            onChange={this.handleChange}
                        >
                            {this.state.instructors.map((num,index) => 
                                <option key={index}>
                                    {num.id} - {num.name} {num.lastname}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Room del servicio</label>
                        <select
                            name="room"
                            className="form-control"
                            onChange={this.handleChange}
                        >
                            {this.state.rooms.map((room,index) => 
                                <option key={index}>
                                    {room.name} - Capacidad: {room.capacity}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="text-center">
                    <button type="submit" className="btn btn-primary" style={{width:"220px",marginTop:"20px"}}>
                        Crear
                    </button>
                    </div>
                </form>
                <button className="btn btn-danger" style={{width:"220px", marginTop:"10px"}} onClick={() => window.location=("/adminMenu/manageServices")}>
                        Regresar
                </button>
            </div>
            </div>
        )
    }
}

export default NewService;