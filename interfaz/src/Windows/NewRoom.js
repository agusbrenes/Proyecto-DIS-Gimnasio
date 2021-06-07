import React, {Component} from "react";
import axios from "axios";

class NewRoom extends Component {
    state = {
        name: "",
        maxCapacity: "",
        allowCapacity: "",
        admin: "",
        beginSchedule: "",
        endSchedule: "",
        nums: [],
        admins: []
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
        await this.fill();
    }

    fill = () => {
        for(var j=1; j <= 30; j++){
            this.state.nums.push(j);
        }
    }

    render() {
        return (
            <div className="window">
                {this.fill()}
                <form onSubmit={this}>
                    <h4 className="text-center">
                        Ingrese los datos del nuevo Room
                    </h4>
                    <div className="form-group">
                        <label for="name">Nombre</label>
                        <input type="text" className="form-control" id="name" placeholder="Nombre del room" name="name" value={this.state.description}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label for="description">Capacidad de maxima personas</label>
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
                        <label for="description">Capacidad recomendada</label>
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
                        <label for="description">Administrador Encargado</label>
                        <select
                            name="admin"
                            className="form-control"
                            onChange={this.handleChange}
                        >
                            {this.state.admins.map((admin,index) => 
                                <option key={index}>
                                    {admin}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label for="begin">Inicio Horario</label>
                            <input type="time" className="form-control" id="begin" name="beginSchedule" value={this.state.beginSchedule}
                            onChange={this.handleChange}/>
                        </div>
                        <div className="col">
                            <label for="end">Final Horario</label>
                            <input type="time" className="form-control" id="end" name="endSchedule" value={this.state.endSchedule}
                            onChange={this.handleChange}/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{marginTop:"20px"}}>
                        Crear
                    </button>
                </form>
            </div>
        )
    }
}

export default NewRoom;