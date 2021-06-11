import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";
import Navbar from "./NavBar/NavBar";

class NewReservation extends Component {
    state = {
        client:"",
        sessions: [],
        list: []
    }

    componentDidMount = () => {
        const token = localStorage.getItem("token")
        console.log(token);
        if (token === null) {
            window.location=("/loginClient");
        }
        this.getData()
    }

    getData = () => {
        axios({
            url: "/api/GetSessions",
            method: "GET",
        })
        .then( async (response) => {
            const data = response.data;
            console.log(data);
            await data.forEach((item) => {
                console.log(item.instructor.id)
                const info = {
                    id: item.id,
                    instructor: item.instructor.id,
                    service: item.service.id,
                    day: item.day.name,
                    beginTime: item.schedule.beginTime,
                    endTime: item.schedule.endTime,
                    capacity: item.capacity,
                    space: item.capacity - item.reservations.length
                }
                this.state.list.push(info);
            })
            this.setState({
                sessions: this.state.list
            })
        })
        .catch((err) => {
            swal.fire({
                title: 'Ocurrio un problema al cargar los datos',
                text: err.message,
                icon: 'error'
            });
            window.history.back();
        });
    }

    reserve = (id) => {
        const data = {
            idClient: "118160369",
            idSession: id
        }

        axios({
            url: "/api/ReserveSession",
            method: "POST",
            data: data
        })
        .then((res) => {
            swal.fire({
                title: 'Se ha realizado la reservación',
                icon: 'success'
            }).then(() => {
                window.history.back();
            });
        })
        .catch((err) => {
            swal.fire({
                title: 'Ocurrio un problema al realizar la reservación',
                icon: 'error'
            }).then(() => {
                window.history.back();
            });
        })
    }

    render() {
        return (
            <div>
                <Navbar/>
            <div className="showSessions">
                <h4>
                    Seleccione la sesión a reservar
                </h4>
                <div className="col-md-12">
                    <div className="row">
                        {this.state.sessions.map((post, index) =>
                        <div key = {index} className="col-md-4">
                            <div className ="card text-white bg-dark mt-4">
                                <p className="card-header text-center text">
                                    {post.id}
                                </p>
                                <p className="text-center">
                                    Instructor: {post.instructor}
                                </p>
                                <p className="text-center">
                                    Servicio: {post.service}
                                </p>
                                <p className="text-center">
                                    Día: {post.day}
                                </p>
                                <p className="text-center">
                                    Horario: {post.beginTime} - {post.endTime} 
                                </p>
                                <p className="text-center">
                                    Capacidad: {post.capacity} - Disponible: {post.space} 
                                </p>
                                <div className="card-footer text-center">
                                    <button className="btn btn-danger button" onClick={() => this.reserve(post.id)}>
                                        Reservar
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
            </div>
        )
    }
}

export default NewReservation