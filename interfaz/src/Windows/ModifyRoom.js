import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";
import Navbar from "./NavBar/NavBar";

class ModifyRoom extends Component {
    state = {
        name: "",
        maxCapacity: "1",
        allowCapacity: "1",
        admin: "",
        beginSchedule: "",
        endSchedule: "",
        id: "",
        is: false,
        adminO: {},
        data: [],
        nums: []
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
        const token = localStorage.getItem("token")
        console.log(token);
        if (token === null) {
            window.location=("/loginClient");
        }
        this.getData();
    }

    fill = () => {
        if (this.state.nums.length === 0){
            for(var j=1; j <= 30; j++){
                this.state.nums.push(j);
            }
        }
    }

    getData = () => {
        axios({
            url: "/api/GetRoom",
            method: "POST",
            data: {name: this.props.match.params.name}
        })
        .then( async (response) => {
            const data = response.data;
            const porcentaje = Math.round((Math.round((data[0].capacity * 100) / data[0].maxCapacity))/10)*10;
            this.setState({
                name: data[0].name,
                maxCapacity: data[0].maxCapacity,
                allowCapacity: porcentaje,
                beginSchedule: data[0].schedule.initialHour,
                endSchedule: data[0].schedule.totalHours,
                id: data[0].schedule.id
            });
            this.getAdmin(data[0].administrators[0].id);
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

    getAdmin = (data) => {
        axios({
            url: "/api/GetAdmin",
            method: "POST",
            data: {id: data}
        })
        .then( async (response) => {
            const data = response.data;
            this.setState({
                adminO: {
                    id: data[0].id,
                    firstName: data[0].firstName,
                    lastName: data[0].lastName
                },
                admin: data[0].id + " - " + data[0].firstName + " " + data[0].lastName
            })
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

    submit = (event) => {
        event.preventDefault();

        if (this.state.name.length === 0){
            swal.fire({
                title: 'Ingrese un nombre para el Room',
                icon: 'warning'
            })
        }

        const data = {
            name: this.state.name,
            maxCapacity: parseInt(this.state.maxCapacity),
            capacity: Math.floor((parseInt(this.state.maxCapacity) * parseInt(this.state.allowCapacity))/100),
            administrators: {
                id: this.state.adminO.id,
                firstName: this.state.adminO.name,
                lastName: this.state.adminO.lastname
            },
            schedule: {
                initialHour: parseInt(this.state.beginSchedule),
                totalHours: parseInt(this.state.endSchedule),
            },
            instructors: [],
            services: [],
            calendars: [],
        }
        axios({
            url: "/api/ModifyRoom",
            method: "POST",
            data: data
        })
        .then((res) => {
            swal.fire({
                title: 'Listo!',
                text: 'Se a Modificado el Room existosamente',
                icon: 'success'
            }).then(() => {
                window.location=("/adminMenu/viewRoom");
            });
        })
        .catch( (err) => {
            swal.fire({
                title: 'Ocurrio un problema al modificar el Room',
                text: err.message,
                icon: 'error'
            });
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
                        Ingrese los datos del nuevo Room
                    </h4>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input type="text" className="form-control" placeholder="Nombre del room" name="name" value={this.state.name}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Capacidad Máxima</label>
                        <select
                            name="maxCapacity"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.maxCapacity}
                        >
                            {this.state.nums.map((num,index) => 
                                <option key={index}>
                                    {num}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Porcentaje de aforo Recomendado (%)</label>
                        <select
                            name="allowCapacity"
                            className="form-control"
                            onChange={this.handleChange}
                            value={this.state.allowCapacity}
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
                    <div className="form-group">
                        <label>Administrador Encargado</label>
                        <input type="input" className="form-control" id="admin" name="admin" value={this.state.admin} disabled="disabled"
                        onChange={this.handleChange}/>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label for="begin">Hora de apertura (24h)</label>
                            <select type="text" className="form-control" id="begin" name="beginSchedule" value={this.state.beginSchedule}
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
                            <label for="end">Horas abierto</label>
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
                        Modificar
                    </button>
                    <button className="btn btn-secondary" onClick={() => window.location=("/adminMenu/viewRoom")} style={{marginTop:"20px", marginLeft: "20px"}}>
                        Regresar
                    </button>
                </form>
            </div>
            </div>
        )
    }
}

export default ModifyRoom;