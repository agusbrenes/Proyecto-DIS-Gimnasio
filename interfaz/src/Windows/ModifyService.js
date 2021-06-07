import React, {Component} from "react";
import axios from "axios";

class ModifyService extends Component {
    state = {
        name: "",
        capacity: "",
        room: "",
        instructor: "",
        nums: [],
        instructors: [],
        rooms: [],
        services: []
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
        await this.getServices();
        await this.getInstructors();
    }

    fill = () => {
        for(var j=1; j <= 30; j++){
            this.state.nums.push(j);
        }
    }

    getServices = () => {
    
    }

    getInstructors = () => {
        axios({
            url: "/api/GetInstructors",
            method: "GET",
        })
        .then( async (response) => {
            const data = response.data;
            await data.forEach((item) => {
                this.state.instructors.push(item.firstName + " " + item.lastName);
            })
            await this.setState({
                instructor: data[0].firstName + " " + data[0].lastName
            }); 
        })
        .catch(() => {
            console.log("Hubo un error al buscar los Instructores");
        });
    }

    submit = () => {

    }

    render() {
        return (
            <div className="window">
                {this.fill()}
                <form onSubmit={this.submit}>
                    <h4 className="text-center">
                        Ingrese los nuevos datos del servicio
                    </h4>
                    <div className="form-group">
                        <label for="description">Nombre</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name"
                            name="name" 
                            value={this.state.description}
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
                        Modificar
                    </button>
                </form>
            </div>
        )
    }
}

export default ModifyService