import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";

class Delete extends Component {
    state = {
        is: "",
        name: "",
        list: [],
        index: 0
    }

    componentDidMount = async () => {
        if (this.props.match.params.is === "Admin"){
            await this.setState({
                is: "Administrador",
              });
            await this.getData();
        } else if (this.props.match.params.is === "Instructor"){
            await this.setState({
                is: "Instructor",
              });
            await this.getData();
        } else if (this.props.match.params.is === "Client"){
            await this.setState({
                is: "Cliente",
              });
            await this.getData();
        } else {
            await this.setState({
                is: "Servicio",
              });
            await this.getData();
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
                window.location=("/adminMenu/manage"+this.props.match.params.is+"s");
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
                window.location=("/adminMenu/manage"+this.props.match.params.is+"s");
            });
        })
        .catch( () => {
            swal.fire({
                title: 'Error',
                text: 'Ocurrio un problema, vuelva a intentarlo más tarde',
                icon: 'error'
            }).then(() => {
                window.location=("/adminMenu/manage"+this.props.match.params.is+"s");
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
                                    {inf.id} - {inf.name} {inf.lastname}
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