import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";

class Delete extends Component {
    state = {
        is: "",
        name: "",
        list: []
    }

    componentDidMount = () => {
        if (this.props.match.params.is === "Admin"){
            this.setState({
                is: "Administrador",
              });
            this.getData();
        } else if (this.props.match.params.is === "Instructor"){
            this.setState({
                is: "Instructor",
              });
            this.getData();
        } else if (this.props.match.params.is === "Client"){
            this.setState({
                is: "Cliente",
              });
            this.getData();
        } else {
            this.setState({
                is: "Servicio",
              });
            this.getData();
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

    getData = () => {
        axios({
            url: "/api/Get"+this.props.match.params.is+"s",
            method: "GET",
        })
        .then( (response) => {
            const data = response.data;
            data.forEach((item) => {
                const info = {
                    name: item.firstName,
                    lastname: item.lastName,
                    id: item.id,
                    description: item.description
                }
                this.state.list.push(info);
            });
            this.setState({
                name: data[0].id + " - " + data[0].firstName + " " + data[0].lastName
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

    delete = (event) => {
        event.preventDefault();
        
        const dato = {id: this.state.list[document.form.name.selectedIndex].id};
        axios({
            url: "/api/Delete"+this.props.match.params.is,
            method: "POST",
            data: dato
        })
        .then( (res) => {
            console.log(res.data.msg);
            swal.fire({
                title: 'Listo!',
                text: 'Se elimino el ' + this.state.is + ' con éxito',
                icon: 'success'
            }).then(() => {
                window.history.back();
            });
        })
        .catch( () => {
            swal.fire({
                title: 'Error',
                text: 'Ocurrio un problema, vuelva a intentarlo más tarde',
                icon: 'error'
            }).then(() => {
                window.history.back();
            });
        })
    }

    render () {
        return (
            <div className="window">
                <form onSubmit={this.delete} name="form">
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
                            {this.state.list.map((inf,index) => 
                                <option key={index}>
                                    {inf.id} - {inf.name} {inf.description} {inf.lastname}
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