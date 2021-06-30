import axios from "axios";
import React, {Component} from "react";
import Navbar from "./NavBar/NavBar";
import swal from "sweetalert2";

class Buzon extends Component {
    state = {
        isAdmin: true,
        msgs: [], 
        list: [],
        token: {}
    }

    componentDidMount = async () => {
        var token = localStorage.getItem("token")
        
        if (token === null) {
            window.location=("/loginClient");
        }

        token = await JSON.parse(localStorage.getItem("token"));
        this.setState({
            token
        })
        if(token.isAdmin === false){
            this.setState({
                isAdmin: false
            })
        }
        this.getMsj(token.id);
    }

    getMsj = (data) => {
        console.log(data);
        var url;
        if (this.state.isAdmin){
            url = "/api/GetAdmin"
        } else {
            url = "/api/GetInstructor"
        }
        axios({
            url,
            method: "POST",
            data: {id: data}
        })
        .then(async (res) => {
            const data = res.data;
            if (data[0].messages.length === 0){
                swal.fire({
                    title: 'Actualmente no tiene mensajes registrados',
                    background: "black",
                    confirmButtonText: "Regresar",
                    icon: 'warning'
                }).then(() => {
                    window.history.back();
                });
            } else if (!this.state.isAdmin){
                console.log(data[0].messages)
                data[0].messages.forEach((item) => {
                    this.state.list.push(item.msg);
                })
                this.setState({
                    msgs: this.state.list
                })
            } else {
                console.log(data[0].messages)
                data[0].messages.forEach((item) => {
                    const info = {
                        msg: item.msg,
                        session: item.session
                    }
                    this.state.list.push(info);
                })
                this.setState({
                    msgs: this.state.list
                })
            }
        })
        .catch((res) => {
            console.log(res);
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

    authorize = (session) => {
        const data = {
            room: {
                schedule: {
                    initialHour: session.room.schedule.initialHour,
                    totalHours: session.room.schedule.totalHours
                },
                name: session.room.name,
                capacity: session.room.capacity
            },
            schedule: {
                month: session.schedule.month,
                day: session.schedule.day
            },
            plan: {
                initialHour: session.plan.initialHour,
                totalHours: session.plan.totalHours
            },
            year: session.year,
            adminName: this.state.token.name + " " + this.state.token.lastName
        }
        console.log(data)
        axios({
            url: "/api/AuthorizeSession",
            method: "POST",
            data
        })
        .then((res) => {
            console.log(res);
            swal.fire({
                title: 'Se ha autorizado la sesión',
                background: "black",
                confirmButtonText: "YEEEIIII",
                icon: 'success'
            })
        })
        .catch((res) => {
            console.log(res);
            swal.fire({
                title: 'Ocurrio un problema al autorizar la sesión',
                background: "black",
                confirmButtonText: "Try Again",
                icon: 'error'
            }).then(() => {
                window.location.reload(false);
            });
        })
    }

    show = () => {
        if (this.state.isAdmin) {
            return (
                <div className="adminMenu">
                    <div className="col-md-12">
                        <div className="row">
                            {this.state.msgs.map((post, index) =>
                            <div key={index} className="col-md-12">
                                <div className ="card text-white bg-dark mt-4">
                                    <p className="card-header text-center text">
                                        {post.msg}
                                    </p>
                                    <div className="card-footer text-center">
                                    <button className="btn btn-danger button" onClick={() => this.authorize(post.session)}>
                                        Aprobar Sesión
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
        } else {
            return(
            <div className="menuInstru">
                <div className="col-md-12">
                    <div className="row">
                        {console.log(this.state)}
                        {this.state.msgs.map((post, index) =>
                        <div key={index} className="col-md-12">
                            <div className ="card text-white bg-dark mt-4">
                                <p className="card-header text-center text">
                                    {post}
                                </p>
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

    render() {
        return (
            <div>
                <Navbar/>
                {this.show()}
            </div>
        )
    }
}

export default Buzon