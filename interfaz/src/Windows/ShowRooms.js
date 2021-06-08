import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";

class ShowRooms extends Component {
    state = {
        data: [],
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

    componentWillMount = () => {
        this.getData();
    }

    getData = async () => {
        await axios({
            url: "/api/GetRooms",
            method: "GET",
        })
        .then( async (response) => {
            const data = response.data;
            await data.forEach((item) => {
                const info = {
                    name: item.name,
                    capacity: item.capacity,
                    maxCapacity: item.maxCapacity,
                    
                }
                this.state.list.push(info);
            });
            this.setState({
                data: this.state.list
            })
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

    modify = (id) => {

    }

    render() {
        return (
            <div className="showData">
                <h4 >
                    Seleccione el Room a modificar
                </h4>
                <div className="col-md-12">
                    <div className="row">
                        {this.state.data.map((post, index) =>
                        <div key = {index} className="col-md-4">
                            <div className ="card text-white bg-dark mt-4">
                                <p className="card-header text-center text">
                                    {post.name} {post.lastname}
                                </p>
                                <p className="text-center">
                                    Capacidad Máxima: {post.maxCapacity}
                                </p>
                                <p className="text-center">
                                    Aforo Recomendado: {post.capacity}
                                </p>
                                <p className="text-center">
                                    Administrador asignado: 
                                </p>
                                <div className="card-footer text-center">
                                    <button className="btn btn-danger button" onClick={() => this.modify(post.id)}>
                                        Modificar
                                    </button>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                    <div className="card-footer text-center">
                        <button className="btn btn-dark button" onClick={() => window.history.back()}>
                            Regresar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShowRooms;