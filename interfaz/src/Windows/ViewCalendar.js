import React, {Component} from "react";
import axios from "axios";
import Navbar from "./NavBar/NavBar";

class ViewCalendar extends Component {
    state = {
        sessions: [],
        list: []
    }

    componentDidMount = () => {
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
        console.log("ahhhhh",data);
        axios({
            url: "/api/GetCalendarSessions",
            method: "POST",
            data: data
        })
        .then(async (res) => {
            const data = res.data;
            console.log("datos", data);
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
        })
        .catch(() => {

        })
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="showData">
                    <h4>
                        Sesiones Disponibles en el Room {this.props.match.params.room}
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
                                    
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewCalendar