import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";

class ShowService extends Component {
    state = {
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

    componentWillMount = () => {
        this.getServices();
    }

    getServices = async () => {
        await axios({
            url: "/api/GetServices",
            method: "GET",
        })
        .then( async (response) => {
            const data = response.data;
            await data.forEach((item) => {
                const info = {
                    name: item.name,
                    capacity: item.capacity,
                    room: item.room,
                    instructor: item.instructor,
                }
                this.state.services.push(info);
            });
        })
        .catch(() => {
            swal.fire({
                title: 'Ocurrio un problema al cargar los datos',
                icon: 'error'
            }).then(() => {
                window.location=("/adminMenu/changeService");
            });
        });
    }

    modify = (id) => {
        window.history.back();
    }

    render() {
        return (
            <div className="showData">
                <h4>
                    Seleccione el Servicio a modificar
                </h4>
                <div className="col-md-12">
                    <div className="row">
                    {console.log(this.state.data)}
                        {this.state.services.map((post, index) =>
                        <div key = {index} className="col-md-4">
                            <div className ="card text-white bg-dark mt-4">
                                <p className="card-header text-center text">
                                    {post.name}
                                </p>
                                <p className="text-center">
                                    Máximo de personas: {post.id}
                                </p>
                                <p className="text-center">
                                    Instructor asignado: {post.phone}
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

export default ShowService;