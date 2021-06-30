import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";
import Navbar from "./NavBar/NavBar";

class ViewCalendar extends Component {
    state = {
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
        days: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado", "Domingo"],
        sessions: [],
        list: [],
        token: {}
    }

    componentDidMount = async () => {
        const token = await JSON.parse(localStorage.getItem("token"));
        
        if (token === null) {
            window.location=("/loginClient");
        }
        this.setState({
            token
        });
        
        this.getSessions();
    }

    getSessions = () => {
        const data = {
            room: {
                name: this.props.match.params.room,
                schedule: {
                    initialHour: parseInt(this.props.match.params.begin),
                    totalHours: parseInt(this.props.match.params.end)
                },
            },
            month: parseInt(this.props.match.params.month),
            year: parseInt(this.props.match.params.year),
            day: parseInt(this.props.match.params.day),
            idInstructor: parseInt(this.state.token.id)
        }

        axios({
            url: "/api/GetCalendarDaySessionsAdmin",
            method: "POST",
            data: data
        })
        .then(async (res) => {
            const data = res.data;
            console.log("Respuesta", data);
            await data.forEach((item) => {
                if (item.color === "Red"){
                    const info = {
                        is: "notMine",
                        instructor: {
                            id: item.session.session.instructor.id,
                            name: item.session.session.instructor.firstName,
                            lastName: item.session.session.instructor.lastName
                        },
                        service: item.session.session.service.name,
                        room: {
                            name: item.session.session.room.name,
                            capacity: item.session.session.room.capacity
                        },
                        begin: item.session.startHour,
                        end: item.session.startHour + 1,
                        capacity: item.session.session.capacity
                    }
                    this.state.list.push(info);
                } else if (item.color === "Blue") {
                    const info = {
                        is: "Mine",
                        instructor: {
                            id: item.session.session.instructor.id,
                            name: item.session.session.instructor.firstName,
                            lastName: item.session.session.instructor.lastName
                        },
                        service: item.session.session.service.name,
                        room: {
                            name: item.session.session.room.name,
                            capacity: item.session.session.room.capacity
                        },
                        begin: item.session.startHour,
                        end: item.session.startHour + 1,
                        capacity: item.session.session.capacity,
                        totalHours: item.session.session.schedule.totalHours
                    }
                    this.state.list.push(info);
                } else {
                    const info = {
                        is: "Free",
                        text: "Campo Libre",
                        begin: item.session.startHour,
                        end: item.session.startHour + 1,
                    }
                    this.state.list.push(info);
                }
            })
            this.setState({
                sessions: this.state.list
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
        })
    }

    show = (post, index) => {
        if (post.is === "Mine"){
            return (
                <div key = {index} className="col-md-4">
                    <div className ="card text-white bg-info mt-4">
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
                        <button className="btn btn-dark button" onClick={() => this.modify(post)}>
                            Modificar Sesión
                        </button>
                        </div>
                    </div>
                </div>
            )
        } else if (post.is === "notMine") {
            return (
                <div key = {index} className="col-md-4">
                    <div className ="card text-white bg-danger mt-4">
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
                    </div>
                </div>
            )
        } else {
            return (
            <div key = {index} className="col-md-4">
                    <div className ="card text-white bg-success mt-4">
                        <p className="card-header text-center text">
                            {post.text}
                        </p>
                        <p>

                        </p>
                        <p>
                            
                        </p>
                        <p className="text-center">
                            Horario {post.begin} - {post.end}
                        </p>
                        <p>
                            
                        </p>
                        <p>
                            
                        </p>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="showData">
                    <h4 style={{color: "white", webkitTextStroke: ".7px black"}}>
                        Sesiones Disponibles en el Room {this.props.match.params.room} para el día {this.state.days[this.props.match.params.day]}
                    </h4>
                    <div className="col-md-12">
                        <div className="row">
                            {this.state.sessions.map((post, index) =>
                                this.show(post, index)
                            )}
                        </div>
                    </div>
                    <div className="card-footer text-center">
                        <button className="btn btn-success button" style={{marginTop:"20px"}} 
                        onClick={() => window.location=("/adminMenu/selectCalendar/viewCalendar/"+ this.props.match.params.room + "/"+ 
                        this.props.match.params.capacity + "/" + this.props.match.params.begin + "/" + this.props.match.params.end + "/" + 
                        this.props.match.params.year + "/"+ this.props.match.params.month +"/"+ this.props.match.params.day + "/admin/newSession")}>
                            Crear nueva Sessión
                        </button>
                    </div>
                    <div className="card-footer text-center">
                        <button className="btn btn-dark button" onClick={() => window.location=("/adminMenu/selectCalendar/admin")}>
                            Regresar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewCalendar