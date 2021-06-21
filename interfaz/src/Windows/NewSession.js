import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";
import Navbar from "./NavBar/NavBar";

class NewSession extends Component {
    state = {
        instructor: "",
        service: "",
        capacity: "",
        day: "",
        beginTime: "",
        endTime: "",
        nums: [], 
        services: [], 
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
        console.log(this.state)
    }

    componentDidMount = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        console.log(token);
        if (token === null) {
            window.location=("/loginClient");
        }
        this.setState({
            instructor: token.name + " " + token.lastName
        });
        this.getServices();
    }

    fill = () => {
        if (this.state.nums.length === 0){
            for(var j=1; j <= 30; j++){
                this.state.nums.push(j);
            }
        }
    }

    getServices = async () => {
        await axios({
            url: "/api/GetServices",
            method: "GET",
        })
        .then( async (response) => {
            const data = response.data;

            await data.forEach((item) => {
                //if(item.instructors[0].id ==)
                    this.state.list.push(item.room.name);
            });
            this.setState({
                services: this.state.list
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

        var begin = this.state.beginTime.replace(/:/g,"");
        var end = this.state.endTime.replace(/:/g,"");

        if (parseInt(begin) > parseInt(end)){
            swal.fire({
                title: 'Seleccione un horario adecuado, la hora final no debe ser mayor a la de inicio',
                icon: 'warning'
            })
            return
        }
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
                    <div className="form-group">
                        <label>Instructor</label>
                        <input type="text" className="form-control" placeholder="Nombre del instructor" name="name" value={this.state.instructor}
                        onChange={this.handleChange} disabled="disabled"/>
                    </div>
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
                        {/*<div className="row">
                            <div className="col">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="check" placeholder="#####" name="check" value={this.state.check}
                                    onChange={this.change}/>
                                    <label for="check">Lunes</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="check2" placeholder="#####" name="check" value={this.state.check}
                                    onChange={this.change}/>
                                    <label for="check2">Martes</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="check3" placeholder="#####" name="check" value={this.state.check}
                                    onChange={this.change}/>
                                    <label for="check3">Miercoles</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="check4" placeholder="#####" name="check" value={this.state.check}
                                    onChange={this.change}/>
                                    <label for="check4">Jueves</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="check5" placeholder="#####" name="check" value={this.state.check}
                                    onChange={this.change}/>
                                    <label for="check5">Viernes</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="check6" placeholder="#####" name="check" value={this.state.check}
                                    onChange={this.change}/>
                                    <label for="check6">Sábado</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="check2" placeholder="#####" name="check" value={this.state.check}
                                    onChange={this.change}/>
                                    <label for="check2">Domingo</label>
                                </div>
                            </div>
                            </div>*/}
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
                            <label for="begin">Horario de Inicio</label>
                            <input type="time" className="form-control" id="begin" name="beginTime"
                            onChange={this.handleChange}/>
                        </div>
                        <div className="col">
                            <label for="end">Horario Final</label>
                            <input type="time" className="form-control" id="end" name="endTime"
                            onChange={this.handleChange}/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{marginTop:"20px"}}>
                        Crear
                    </button>
                </form>
            </div>
            </div>
        )
    }
}

export default NewSession