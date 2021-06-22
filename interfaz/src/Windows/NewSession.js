import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";
import Navbar from "./NavBar/NavBar";

class NewSession extends Component {
    state = {
        instructor: "",
        service: "",
        capacity: "1",
        day: "",
        beginTime: "00",
        endTime: "1",
        isInstru: true,
        nums: [], 
        services: [], 
        instructors: [],
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

    componentDidMount = async () => {
        const token = JSON.parse(localStorage.getItem("token"));

        if (token === null) {
            window.location=("/loginClient");
        }

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
                    this.state.list.push(item.name);
            });
            this.setState({
                services: this.state.list
            })
            console.log(this.state)
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
                    <input type="text" className="form-control" placeholder="Nombre del instructor" name="name" value={this.state.instructor}
                    onChange={this.handleChange} disabled="disabled"/>
                </div>
                
            )
        }
    }

    submit = (event) => {
        event.preventDefault();

        if (this.state.isInstru)
            var status = "standBy"
        else 
            var status = "aprove"

        
    }

    render() {
        return (
            <div>
                <Navbar/>
            <div className="window">
                {this.fill()}
                <form onSubmit={this.submit} name="form">
                    <h4 className="text-center">
                        Ingrese los datos de la sesión
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
                                    {num}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Capacidad de personas</label>
                        <select
                            name="capacity"
                            className="form-control"
                            onChange={this.handleChange}
                        >
                            {this.state.nums.map((num,index) => 
                                <option key={index}>
                                    {num}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Seleccione el dia</label>
                            <select
                            name="capacity"
                            className="form-control"
                            onChange={this.handleChange}
                        >
                            <option>Lunes</option>
                            <option>Martes</option>
                            <option>Miercoles</option>
                            <option>Jueves</option>
                            <option>Viernes</option>
                            <option>Sábado</option>
                            <option>Domingo</option>
                        </select>
                    </div>    
                    <div className="row">
                        <div className="col">
                            <label for="begin">Hora de Inicio</label>
                            <select type="text" className="form-control" id="begin" name="beginSchedule" value={this.state.beginSchedule}
                            onChange={this.handleChange}>
                                <option>00</option>
                                <option>01</option>
                                <option>02</option>
                                <option>03</option>
                                <option>04</option>
                                <option>05</option>
                                <option>06</option>
                                <option>07</option>
                                <option>08</option>
                                <option>09</option>
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
                            <select type="text" className="form-control" id="end" name="endSchedule" value={this.state.endSchedule}
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
                    <button type="submit" className="btn btn-primary" style={{marginTop:"20px"}}>
                        Crear
                    </button>
                    <button className="btn btn-secondary" onClick={() => window.location=("/adminMenu/sessionManage")} style={{marginTop:"20px", marginLeft: "20px"}}>
                        Regresar
                    </button>
                </form>
            </div>
            </div>
        )
    }
}

export default NewSession