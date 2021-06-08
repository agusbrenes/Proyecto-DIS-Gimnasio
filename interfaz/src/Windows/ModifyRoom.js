import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";

class NewRoom extends Component {
    state = {
        name: "",
        maxCapacity: "1",
        allowCapacity: "1",
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
        console.log(this.state);
    }

    componentDidMount = async () => {
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
        }

        if (parseInt(this.state.maxCapacity) < parseInt(this.state.allowCapacity)){
            swal.fire({
                title: 'La capacidad recomendada no debe ser mayor a la capacidad máxima',
                icon: 'warning'
            })
        }

        var begin = this.state.beginSchedule.replace(/:/g,"");
        var end = this.state.endSchedule.replace(/:/g,"");

        if (parseInt(begin) > parseInt(end)){
            swal.fire({
                title: 'Seleccione un horario adecuado, la hora final no debe ser mayor a la de inicio',
                icon: 'warning'
            })
        }

        const data = {
            name: this.state.name,
            maxCapacity: this.state.maxCapacity,
            capacity: this.state.allowCapacity,
            administrator: {id:this.state.admins[document.form.admin.selectedIndex].id},
            beginTime: this.state.beginSchedule,
            endTime: this.state.endSchedule,
        }
        console.log(data);
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
                        <label>Capacidad de maxima personas</label>
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
                        <label>Capacidad recomendada</label>
                        <select
                            name="allowCapacity"
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
                            <label for="begin">Horario de Inicio</label>
                            <input type="time" className="form-control" id="begin" name="beginSchedule" value={this.state.beginSchedule}
                            onChange={this.handleChange}/>
                        </div>
                        <div className="col">
                            <label for="end">Horario Final</label>
                            <input type="time" className="form-control" id="end" name="endSchedule" value={this.state.endSchedule}
                            onChange={this.handleChange}/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{marginTop:"20px"}}>
                        Modificar
                    </button>
                </form>
            </div>
        )
    }
}

export default NewRoom;