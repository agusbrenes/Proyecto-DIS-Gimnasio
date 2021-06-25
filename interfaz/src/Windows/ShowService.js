import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";
import Navbar from "./NavBar/NavBar";

class ShowService extends Component {
    state = {
        services: [],
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
        const token = localStorage.getItem("token")
        
        if (token === null) {
            window.location=("/loginClient");
        }
        this.getServices();
    }

    getServices = async () => {
        await axios({
            url: "/api/GetServices",
            method: "GET",
        })
        .then( async (response) => {
            const data = response.data;
            console.log("what", data);
            await data.forEach((item) => {
                var instru = item.instructors[0].firstName + " " + item.instructors[0].lastName
                const info = {
                    name: item.name,
                    capacity: item.room.capacity,
                    room: item.room.name,
                    instructor: instru,
                }
                this.state.list.push(info);
                console.log(this.state.services);
            });
            this.setState({
                services: this.state.list
            })
        })
        .catch(() => {
            swal.fire({
                title: 'Ocurrio un problema al cargar los datos',
                background: "black",
                confirmButtonText: "Reload",
                icon: 'error'
            }).then(() => {
                window.location.reload(false);
            });
        });
    }

    show = (name) => {
        window.location=("/adminMenu/changeService/"+name)
    }

    render() {
        return (
            <div>
                <Navbar/>
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
                                    Máximo de personas: {post.capacity}
                                </p>
                                <p className="text-center">
                                    Instructor asignado: {post.instructor}
                                </p>
                                <p className="text-center">
                                    Room asignado: {post.room}
                                </p>
                                <div className="card-footer text-center">
                                    <button className="btn btn-danger button" onClick={() => this.show(post.name)}>
                                        Modificar
                                    </button>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                    <div className="card-footer text-center">
                        <button className="btn btn-dark button" onClick={() => window.location=("/adminMenu/manageServices")}>
                            Regresar
                        </button>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default ShowService;