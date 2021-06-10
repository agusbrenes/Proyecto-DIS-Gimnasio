import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";

class NewReservation extends Component {
    state = {
        client:"",
        sessions: []
    }

    componentDidMount = () => {
        this.getData()
    }

    getData = () => {
        axios({
            url: "/api/GetReservations",
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
            });
            window.history.back();
        });
    }

    pay = (id) => {
        
    }

    render() {
        return (
            <div className="showSessions">
                <h4>
                    
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
                                    <button className="btn btn-danger button" onClick={() => this.pay(post.id)}>
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
        )
    }
}

export default NewReservation