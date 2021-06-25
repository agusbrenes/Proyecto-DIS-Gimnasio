import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";
import Navbar from "./NavBar/NavBar";

class ShowReservations extends Component {
    state = {
        client:"",
        sessions: []
    }

    componentDidMount = () => {
        const token = localStorage.getItem("token")
        
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
            await data.forEach((item) => {
                const info = {
                    instructor: item.instructor,
                    service: item.service,
                    day: item.day,
                    schedule: item.schedule
                }
                this.state.sessions.push(info);
            })
        })
        .catch((err) => {
            swal.fire({
                title: 'Ocurrio un problema al cargar los datos',
                text: err.message,
                icon: 'error'
            }).then( () => {
                window.history.back();
            })
            
        });
    }

    pay = (id) => {
        axios({
            url: "/api/ReserveSession",
            method: "POST"
        }) 
    }

    render() {
        return (
            <div>
                <Navbar/>
            <div className="showSessions">
                <h4>
                    Estas son sus reservaciones
                </h4>
                <div className="col-md-12">
                    <div className="row">
                        {this.state.sessions.map((post, index) =>
                        <div key = {index} className="col-md-4">
                            <div className ="card text-white bg-dark mt-4">
                                <p className="card-header text-center text">
                                    {post.name} {post.lastname}
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
                                    Horario: - 
                                </p>
                                <div className="card-footer text-center">
                                    <button className="btn btn-danger button" onClick={() => this.reserve(post.id)}>
                                        Pagar
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

export default ShowReservations