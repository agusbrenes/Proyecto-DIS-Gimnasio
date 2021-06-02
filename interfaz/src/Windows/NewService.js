import React, {Component} from "react";
import axios from "axios";

const swal = require('sweetalert2');

class NewService extends Component {
    state = {
        description: "",
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
        this.getInstructors();
    }

    fill = () => {
        for(var j=1; j <= 30; j++){
            this.state.nums.push(j);
        }
    }

    getInstructors = () => {
        axios({
            url: "/api/GetInstructors",
            method: "GET",
        })
        .then( (response) => {
            const data = response.data;
             data.forEach((item) => {
                this.state.instructors.push(item.firstName + " " + item.lastName);
            })
            this.state.instructor = data[0].firstName + " " + data[0].lastName;
        })
        .catch(() => {
            console.log("Hubo un error al buscar los Instructores");
        });
    }

    getRooms = () => {
        axios.get("/api/GetRooms")
        .then((response) => {
            const data = response.data;
            this.setState({
                instructors: data,
                instructor: data[0].name
            })
        })
        .catch(() => {
            console.log("Hubo un error al buscar los Rooms");
        });
    }

    submit = (event) => {
        event.preventDefault();

        axios({
            url: "/api/NewService",
            method: "POST",
            data: { 
                description: this.state.description,
                capacity: this.state.capacity,
                instructor: this.state.instructor,
                room: this.state.room
            }
        })
        .then(() => {
            swal.fire({
                title: 'Listo!',
                text: 'Se a creado el servicio',
                icon: 'success'
            }).then(() => {
                window.location = ("/");
            });
        })
        .catch(() => {
            swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error al crear un servicio',
                icon: 'error'
            })
        })
    }

    render() {
        return (
            <div className="window">
                {this.fill()}
                <form onSubmit={this.submit}>
                    <h4 className="text-center">
                        Ingrese los datos del nuevo servicio
                    </h4>
                    <div className="form-group">
                        <label for="description">Descripción</label>
                        <textarea type="text" className="form-control" id="description" placeholder="Descripción del servicio" name="description" value={this.state.description}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label for="description">Capacidad de personas</label>
                        <select
                            name="capacity"
                            className="form-control"
                            onChange={this.handleChange}
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
                        <select
                            name="instructor"
                            className="form-control"
                            onChange={this.handleChange}
                        >
                            {console.log(this.state.instructors,this.state.nums)}
                            {this.state.instructors.map((num,index) => 
                                <option key={index}>
                                    {num}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="description">Room del servicio</label>
                        <select
                            name="instructor"
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
                    <button type="submit" className="btn btn-primary" style={{marginTop:"20px"}}>
                        Crear
                    </button>
                </form>
            </div>
        )
    }
}

export default NewService;