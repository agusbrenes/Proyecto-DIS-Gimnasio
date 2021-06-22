import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";
import Navbar from "./NavBar/NavBar";

class NewRoom extends Component {
    state = {
        name: "",
        maxCapacity: "1",
        allowCapacity: "10",
        admin: "",
        beginSchedule: "",
        endSchedule: "",
        is: false,
        admins: [],
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
            url: "/api/GetAdmins",
            method: "GET",
        })
        .then( async (response) => {
            const data = response.data;
            await data.forEach((item) => {
                const info = {
                    name: item.firstName,
                    lastname: item.lastName,
                    id: item.id,
                }
                this.state.admins.push(info);
            });
            this.setState({
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
            return
        }

        var index = document.form.admin.selectedIndex;

        const data = {
            name: this.state.name,
            maxCapacity: parseInt(this.state.maxCapacity),
            capacity: Math.floor((parseInt(this.state.maxCapacity) * parseInt(this.state.allowCapacity))/100),
            administrator: {
                id: this.state.admins[index].id,
                firstName: this.state.admins[index].name,
                lastName: this.state.admins[index].lastname
            },
            schedule: {
                initialHour: parseInt(this.state.beginSchedule),
                totalHours: parseInt(this.state.endSchedule),
            }
        }

        axios({
            url: "/api/NewRoom",
            method: "POST",
            data: data
        })
        .then((res) => {
            if (res.data.msg === true) {
                swal.fire({
                    title: 'Error',
                    text: 'Ya se encuentra un Room con este nombre',
                    icon: 'error'
                })                
            } else {
                swal.fire({
                    title: 'Listo!',
                    text: 'Se a creado el Room existosamente',
                    icon: 'success'
                }).then(() => {
                    window.history.back();
                });
            }
        })
        .catch( (err) => {
            swal.fire({
                title: 'Ocurrio un problema al crear el Room',
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
                        <input type="text" className="form-control" placeholder="Nombre del room" name="name" value={this.state.description}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Capacidad de máxima personas</label>
                        <select
                            name="maxCapacity"
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
                        <label>Porcentaje de aforo Recomendado (%)</label>
                        <select
                            name="allowCapacity"
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
                    <div className="form-group">
                        <label>Administrador Encargado</label>
                        <select
                            name="admin"
                            className="form-control"
                            onChange={this.handleChange}
                        >
                            {this.state.admins.map((inf,index) => 
                                <option key={index}>
                                    {inf.id} - {inf.name} {inf.lastname}
                                </option>
                            )}
                        </select>
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
                        Crear
                    </button>
                    <button className="btn btn-secondary" onClick={() => window.location=("/adminMenu/manageRooms")} style={{marginTop:"20px", marginLeft: "20px"}}>
                        Regresar
                    </button>
                </form>
            </div>
            </div>
        )
    }
}

export default NewRoom;