import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";
import Navbar from "./NavBar/NavBar";

class ShowRooms extends Component {
    state = {
        data: [],
        list: [],
        admin: ""
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
        console.log(token);
        if (token === null) {
            window.location=("/loginClient");
        }
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
                var admin = item.administrators[0].firstName + " " + item.administrators[0].lastName
                const info = {
                    name: item.name,
                    capacity: item.capacity,
                    maxCapacity: item.maxCapacity,
                    admin: admin,
                    beginTime: item.schedule.initialHour,
                    endTime: item.schedule.initialHour + item.schedule.totalHours
                }
                this.state.list.push(info);
            });
            this.setState({
                data: this.state.list
            })
            console.log(this.state);
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

    modify = (name) => {
        window.location=("/adminMenu/viewRoom/"+name)
    }

    render() {
        return (
            <div>
                <Navbar/>
            <div className="showData">
                <h4 >
                    Seleccione el Room a modificar
                </h4>
                <div className="col-md-12">
                    <div className="row">
                        {this.state.data.map((post, index) =>
                        <div key = {index} className="col-md-4">
                            <div className ="card text-white bg-dark mt-4">
                                {console.log(post)}
                                <p className="card-header text-center text">
                                    {post.name}
                                </p>
                                <p className="text-center">
                                    Capacidad Máxima: {post.maxCapacity}
                                </p>
                                <p className="text-center">
                                    Aforo Recomendado: {post.capacity}
                                </p>
                                <p className="text-center">
                                    Administrador asignado: {post.admin}
                                </p>
                                <p className="text-center">
                                    Abierto desde las {post.beginTime}, hasta las {post.endTime} horas
                                </p>
                                <div className="card-footer text-center">
                                    <button className="btn btn-danger button" onClick={() => this.modify(post.name)}>
                                        Modificar
                                    </button>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                    <div className="card-footer text-center">
                        <button className="btn btn-dark button" onClick={() => window.location=("/adminMenu/manageRooms")}>
                            Regresar
                        </button>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default ShowRooms;