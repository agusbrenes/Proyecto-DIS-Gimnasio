import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";
import Navbar from "./NavBar/NavBar";

class NewSession extends Component {
    state = {
        instructor: "",
        service: "",
        capacity: "10",
        day: "",
        beginTime: "0",
        endTime: "1",
        isInstru: true,
        nums: [], 
        services: [], 
        instructors: [],
        list: [],
        days: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado", "Domingo"]
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

    componentDidMount = async () => {
        var token = localStorage.getItem("token")
        
        if (token === null) {
            window.location=("/loginClient");
        }
        token = JSON.parse(localStorage.getItem("token"));

        if (this.props.match.params.is === "admin"){
            this.getInstructors();
        } else {
            this.setState({
                instructor: token.name + " " + token.lastName
            });
        }
        this.getServices();
    }

    fill = () => {
        if (this.state.nums.length === 0){
            for(var j=1; j <= 30; j++){
                this.state.nums.push(j);
            }
        }
    }

    getInstructors = () => {
        axios({
            url: "/api/GetInstructors",
            method: "GET",
        })
        .then( async (response) => {
            const data = response.data;
            await data.forEach((item) => {
                const info = {
                    name: item.firstName,
                    lastname: item.lastName,
                    email: item.email,
                    id: item.id,
                    phone: item.phone,
                }
                this.state.instructors.push(info);
            });
            this.setState({
                instructor: data[0].id + " - " + data[0].firstName + data[0].lastName,
                isInstru: false
            })
        })
        .catch(() => {
            console.log("Hubo un error al buscar los Instructores");
        });
    }

    getServices = async () => {
        await axios({
            url: "/api/GetServices",
            method: "GET",
        })
        .then( async (response) => {
            const data = response.data;

            await data.forEach((item) => {
                if (item.room.name === this.props.match.params.room) {
                    const info = {
                        name: item.name,
                        capacity: item.room.capacity
                    }
                    this.state.list.push(info);
                }
            });
            this.setState({
                services: this.state.list
            })
            console.log(this.state)
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

    show = () => {
        if (!this.state.isInstru) {
            return (
                <div className="form-group">
                    <label>Instructor</label>
                    <select
                        name="instructor"
                        className="form-control"
                        onChange={this.handleChange}
                    >
                        {this.state.instructors.map((num,index) => 
                            <option key={index}>
                                {num.id} - {num.name} {num.lastname}
                            </option>
                        )}
                    </select>
                </div>
            )
        } else {
            return (
                <div className="form-group">
                    <label>Instructor</label>
                    <input type="text" className="form-control" placeholder="Nombre del instructor" name="instructor" value={this.state.instructor}
                    onChange={this.handleChange} disabled="disabled"/>
                </div>
                
            )
        }
    }

    submit = async (event) => {
        event.preventDefault();

        var index2 = document.form.service.selectedIndex;

        if (this.state.isInstru) {
            const token = await JSON.parse(localStorage.getItem("token"));
            var instructor = {
                id: parseInt(token.id),
                firstName: token.name,
                lastName: token.lastName
            }
        } else {
            var index = document.form.instructor.selectedIndex;
            instructor = {
                id: this.state.instructors[index].id,
                firstName: this.state.instructors[index].name,
                lastName: this.state.instructors[index].lastname
            }
        }
        
        const data = {
            instructor,
            service: {
                name: this.state.services[index2].name
            },
            room: {
                name: this.props.match.params.room,
                capacity: parseInt(this.props.match.params.capacity),
                schedule: {
                    initialHour: parseInt(this.props.match.params.begin),
                    totalHours: parseInt(this.props.match.params.end)
                }
            },
            schedule: {
                month: parseInt(this.props.match.params.month),
                day: parseInt(this.props.match.params.day)
            },
            plan: {
                initialHour: parseInt(this.state.beginTime),
                totalHours: parseInt(this.state.endTime)
            },
            capacity: Math.floor((parseInt(this.state.services[index2].capacity) * parseInt(this.state.capacity))/100),
            year: parseInt(this.props.match.params.year),
            isAdmin: !this.state.isInstru

        }
        console.log(data);
        axios({
            url: "/api/NewSession",
            method: "POST",
            data: data
        })
        .then((res) => {
            swal.fire({
                title: "Se ha creado la sesión con éxito",
                background: "black",
                icon: "success"
            })
            .then(() => {
                if (this.props.match.params.is === "admin"){
                    window.location=("/adminMenu/selectCalendar/viewCalendar/"+ this.props.match.params.room + "/"+ 
                            this.props.match.params.capacity + "/" + this.props.match.params.begin + "/" + 
                            this.props.match.params.end + "/" + this.props.match.params.year +"/"+ this.props.match.params.month +"/"+ 
                            this.props.match.params.day +"/admin");
                } else {
                    window.location=("/instructorMenu/selectCalendar/viewCalendar/"+ this.props.match.params.room + "/"+ 
                    this.props.match.params.capacity + "/" + this.props.match.params.begin + "/" + 
                    this.props.match.params.end + "/" + this.props.match.params.year +"/"+ this.props.match.params.month +"/"+ 
                    this.props.match.params.day +"/instructor");
                }
            })
        })
        .catch((err) => {
            swal.fire({
                title: 'Ocurrio un problema al crear la sesión',
                text: err,
                background: "black",
                confirmButtonText: "Try Again",
                icon: 'warning'
            })
        })
    }

    render() {
        return (
            <div>
                <Navbar/>
            <div className="window">
                {this.fill()}
                <form onSubmit={this.submit} name="form">
                    <h4 className="text-center">
                        Ingrese los datos para la sesión en el Room {this.props.match.params.room} en el dia {this.state.days[this.props.match.params.day]}
                    </h4>
                    {this.show()}
                    <div className="form-group">
                        <label>Seleccione el Servicio para el que sera la sesión</label>
                        <select
                            name="service"
                            className="form-control"
                            onChange={this.handleChange}
                        >
                            {this.state.list.map((num,index) => 
                                <option key={index}>
                                    {num.name} - Capacidad: {num.capacity}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Porcentaje de aforo para la sesión (%)</label>
                        <select
                            name="capacity"
                            className="form-control"
                            onChange={this.handleChange}
                        >
                            <option>10</option>
                            <option>20</option>
                            <option>30</option>
                            <option>40</option>
                            <option>50</option>
                            <option>60</option>
                            <option>70</option>
                            <option>80</option>
                            <option>90</option>
                            <option>100</option>
                        </select>
                    </div> 
                    <div className="row">
                        <div className="col">
                            <label for="begin">Hora de Inicio</label>
                            <select type="text" className="form-control" id="begin" name="beginTime" value={this.state.beginTime}
                            onChange={this.handleChange}>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                                <option>14</option>
                                <option>15</option>
                                <option>16</option>
                                <option>17</option>
                                <option>18</option>
                                <option>19</option>
                                <option>20</option>
                                <option>21</option>
                                <option>22</option>
                                <option>23</option>
                            </select>
                        </div>
                        <div className="col">
                            <label for="end">Duración</label>
                            <select type="text" className="form-control" id="end" name="endTime" value={this.state.endTime}
                            onChange={this.handleChange}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-center">
                    <button type="submit" className="btn btn-primary" style={{width:"220px",marginTop:"20px"}}>
                        Crear
                    </button>
                    </div>
                </form>
                <button className="btn btn-danger" style={{width:"220px", marginTop:"10px"}} 
                onClick={() => {if (this.props.match.params.is === "admin"){
                    window.location=("/adminMenu/selectCalendar/viewCalendar/"+ this.props.match.params.room + "/"
                    + this.props.match.params.capacity + "/" + this.props.match.params.begin + "/" + this.props.match.params.end + "/" + 
                    this.props.match.params.year + "/"+ this.props.match.params.month +"/"+ this.props.match.params.day +"/admin");
                } else {
                    window.location=("/instructorMenu/selectCalendar/viewCalendar/"+ this.props.match.params.room + "/"
                    + this.props.match.params.capacity + "/" + this.props.match.params.begin + "/" + this.props.match.params.end + "/" + 
                    this.props.match.params.year + "/"+ this.props.match.params.month +"/"+ this.props.match.params.day + "/instructor")
                }
                }}>
                        Regresar
                </button>
            </div>
            </div>
        )
    }
}

export default NewSession