import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";
import Navbar from "./NavBar/NavBar";

class ViewCalendarIns extends Component {
    state = {
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
        days: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado", "Domingo"],
        sessions: [],
        list: []
    }

    componentDidMount = () => {
        const token = localStorage.getItem("token")
        
        if (token === null) {
            window.location=("/loginClient");
        }
        this.getSessions();
    }

    getSessions = () => {
        const data = {
            room: {
                name: this.props.match.params.room,
                capacity: parseInt(this.props.match.params.capacity)
            },
            year: this.props.match.params.year,
            schedule: {
                month: parseInt(this.props.match.params.month),
                day: parseInt(this.props.match.params.day)
            }
        }

        axios({
            url: "/api/GetCalendarSessions",
            method: "POST",
            data: data
        })
        .then(async (res) => {
            const data = res.data;
            console.log(data);
            if (data.length === 0) {
                swal.fire({
                    title: 'No hay sesiones registradas para ese dia',
                    icon: 'warning',
                    background: "black",
                    showCancelButton: true,
                    cancelButtonText: "Regresar",
                    cancelButtonColor: "red",
                    confirmButtonText: "Crear una nueva",
                    confirmButtonColor: "green"
                }).then((result) => {
                    if (result.isConfirmed){
                        window.location=("/adminMenu/selectCalendar/viewCalendar/"+ this.props.match.params.room + "/"+ 
                        this.props.match.params.capacity + "/" + this.props.match.params.year +"/"+ this.props.match.params.month +"/"+ 
                        this.props.match.params.day +"/instructor/newSession");
                    } else {
                        window.location=("/instructorMenu/selectCalendar/instructor")
                    }
                });
            } else {
                await data.forEach((item) => {
                    const info = {
                        instructor: {
                            id: item.instructor.id,
                            name: item.instructor.firstName,
                            lastName: item.instructor.lastName
                        },
                        service: item.service.name,
                        room: {
                            name: item.room.name,
                            capacity: item.room.capacity
                        },
                        begin: item.plan.initialHour,
                        end: item.plan.initialHour + item.plan.totalHours,
                        capacity: item.capacity
                    }
                    this.state.list.push(info);
                })
                this.setState({
                    sessions: this.state.list
                })
            }
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
        })
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="showDataIns">
                    <h4 style={{color: "green", webkitTextStroke: ".7px black"}}>
                        Sesiones Disponibles en el Room {this.props.match.params.room} para el día {this.state.days[this.props.match.params.day]}
                    </h4>
                    <div className="col-md-12">
                        <div className="row">
                            {console.log(this.state)}
                            {this.state.sessions.map((post, index) =>
                            <div key = {index} className="col-md-4">
                                <div className ="card text-white bg-dark mt-4">
                                    <p className="card-header text-center text">
                                        Servicio: {post.service}
                                    </p>
                                    <p className="text-center">
                                        Instructor: {post.instructor.name} {post.instructor.lastName}
                                    </p>
                                    <p className="text-center">
                                        Horario de la sesión: {post.begin} - {post.end}
                                    </p>
                                    <p className="text-center">
                                        Capacidad de la sesión: {post.capacity}
                                    </p>
                                    <div className="card-footer text-center">
                                    <button className="btn btn-danger button" onClick={() => this.modify()}>
                                        Modificar Sesión
                                    </button>
                                </div>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                    <div className="card-footer text-center">
                        <button className="btn btn-success button" style={{marginTop:"20px"}} 
                        onClick={() => window.location=("/adminMenu/selectCalendar/viewCalendar/"+ this.props.match.params.room + "/"+ 
                        this.props.match.params.capacity + "/" + this.props.match.params.year +"/"+ this.props.match.params.month +"/"+ 
                        this.props.match.params.day +"/instructor/newSession")}>
                            Crear Nueva Sesión
                        </button>
                    </div>
                    <div className="card-footer text-center">
                        <button className="btn btn-dark button" onClick={() => window.location=("/instructorMenu/selectCalendar/instructor")}>
                            Regresar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewCalendarIns