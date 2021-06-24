import React, {Component} from "react";
import axios from "axios";
import Navbar from "./NavBar/NavBar";

class SelectMonth extends Component {
    state = {
        year: "2020",
        month: "Enero",
        day: "Lunes",
        room: "",
        rooms: []
    }

    componentDidMount = () => {
        this.getRooms()
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

    getRooms = () => {
        axios({
            url: "/api/GetRooms",
            method: "GET",
        })
        .then( async (response) => {
            const data = response.data;
            await data.forEach((item) => {
                const info = {
                    name: item.name,
                    capacity: item.capacity
                }
                this.state.rooms.push(info);
            })
            this.setState({
                room: data[0].name
            }); 
        })
        .catch(() => {
            console.log("Hubo un error al buscar los Rooms");
        });
    }

    show = (event) => {
        event.preventDefault();

        const index = document.form.room.selectedIndex;
        const month = document.form.month.selectedIndex;
        const day = document.form.day.selectedIndex;

        window.location=("/adminMenu/selectCalendar/viewCalendar/"+ this.state.room + "/"+ this.state.rooms[index].capacity + "/" + this.state.year +"/"+ month +"/"+ day +"/admin");
    }

    render() {
        return (
            <div>
                <Navbar/>
            <div className="adminMenu">
                <form onSubmit={this.show} name="form">
                    <h4 className="text-center">
                        Seleccione Room, Año, Mes y Dia para ver el calendario
                    </h4>
                    <div className="form-group">
                        <h5>Room</h5>
                        <select
                            name="room"
                            id="room"
                            className="form-control"
                            onChange={this.handleChange}
                        >
                            {this.state.rooms.map((room,index) => 
                                <option key={index}>
                                    {room.name}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <h5>Seleccione el año</h5>
                        <select
                            name="year"
                            className="form-control"
                            onChange={this.handleChange}
                        >
                            <option>2020</option>
                            <option>2021</option>
                            <option>2022</option>
                            <option>2023</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <h5>Seleccione el mes</h5>
                        <select
                            name="month"
                            className="form-control"
                            onChange={this.handleChange}
                        >
                            <option>Enero</option>
                            <option>Febrero</option>
                            <option>Marzo</option>
                            <option>Abril</option>
                            <option>Mayo</option>
                            <option>Junio</option>
                            <option>Julio</option>
                            <option>Agosto</option>
                            <option>Setiembre</option>
                            <option>Octubre</option>
                            <option>Noviembre</option>
                            <option>Diciembre</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <h5>Seleccione el dia</h5>
                            <select
                            name="day"
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
                    <div className="form-group text-center">
                    <button type="submit" className="btn btn-primary" style={{marginTop:"20px", width:"220px"}}>
                        Ver
                    </button>  
                    </div>
                </form>
                <div className="d-flex justify-content-center" style={{marginTop:"20px"}}>
                    <button className="btn btn-danger" style={{width:"220px"}} onClick={() => {window.location=("/adminMenu/sessionManage")}}>
                        Regresar
                    </button>
                </div>
            </div>
            </div>
        )
    }
}

export default SelectMonth