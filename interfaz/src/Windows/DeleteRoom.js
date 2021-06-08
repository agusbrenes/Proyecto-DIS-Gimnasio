import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";

class DeleteRoom extends Component {
    state = {
        name: "",
        list: []
    }

    componentDidMount = () => {
        this.getData();
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
            url: "/api/GetRooms",
            method: "GET",
        })
        .then( (response) => {
            const data = response.data;
            data.forEach((item) => {
                this.state.list.push(item.name);
            });
            this.setState({
                name: data[0].name
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
        
        const dato = {name: this.state.list[document.form.name.selectedIndex]};
        axios({
            url: "/api/DeleteRoom",
            method: "POST",
            data: dato
        })
        .then( (res) => {
            console.log(res.data.msg);
            swal.fire({
                title: 'Listo!',
                text: 'Se elimino el Room con éxito',
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
                        Seleccione el Room a eliminar 
                    </h4>
                    <div className="form-group">
                        <label for="description">Room</label>
                        <select
                            name="name"
                            className="form-control"
                            onChange={this.handleChange}
                        >
                            {this.state.list.map((inf,index) => 
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

export default DeleteRoom;