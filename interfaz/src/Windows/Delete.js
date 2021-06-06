import React, {Component} from "react";
import axios from "axios";

class Delete extends Component {
    state = {
        is: "",
        name: "",
        info: []
    }

    componentDidMount = async () => {
        if (this.props.match.params.is === "Admin"){
            await this.setState({
                is: "Administrador",
              });
        } else if (this.props.match.params.is === "Instru"){
            await this.setState({
                is: "Instructor",
              });
            await this.getInstructors();
        } else if (this.props.match.params.is === "Client"){
            await this.setState({
                is: "Cliente",
              });
        } else {
            await this.setState({
                is: "Servicio",
              });
        }
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

    getInstructors = () => {
        axios({
            url: "/api/GetInstructors",
            method: "GET",
        })
        .then( async (response) => {
            const data = response.data;
            await data.forEach((item) => {
                this.state.info.push(item.firstName + " " + item.lastName);
            })
            await this.setState({
                name: data[0].firstName + " " + data[0].lastName
            }); 
        })
        .catch(() => {
            console.log("Hubo un error al buscar los Instructores");
        });
    }

    delete = () => {

    }

    render () {
        return (
            <div className="window">
                <form onSubmit={this.delete}>
                    <h4 className="text-center">
                        Seleccione el {this.state.is} a eliminar 
                    </h4>
                    <div className="form-group">
                        <label for="description">{this.state.is}</label>
                        <select
                            name="name"
                            className="form-control"
                            onChange={this.handleChange}
                        >
                            {this.state.info.map((inf,index) => 
                                <option key={index}>
                                    {inf}
                                </option>
                            )}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{marginTop:"20px"}}>
                        Eliminar
                    </button>
                </form>
            </div>
        )
    }
}

export default Delete;