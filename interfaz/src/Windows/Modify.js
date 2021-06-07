import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";

class Modify extends Component {
    state = {
        name: "",
        lastname: "",
        email: "",
        id: "",
        phone: "",
        password: "",
        confirm: "",
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
        if (this.props.match.params.is === "Admin"){
            await this.setState({
                is: "Administrador"
            });
        } else if (this.props.match.params.is === "Instructor"){
            await this.setState({
                is: "Instructor",
            });
            await this.getData();
        } else if (this.props.match.params.is === "Client"){
            await this.setState({
                is: "Cliente",
            });
            await this.getData();
        }
    }

    getData = async () => {
        const dato = {id: this.props.match.params.id }
        axios({
            url: "/api/Get"+this.props.match.params.is,
            method: "POST",
            data: dato,
        })
        .then((response) => {
            console.log(response.data[0]);
            this.setState({
                name: response.data[0].firstName,
                lastname: response.data[0].lastName,
                email: response.data[0].email,
                id: response.data[0].id,
                phone: response.data[0].phone,
            })
        })
        .catch(() => {
            swal.fire({
                title: 'Ocurrio un problema al cargar los datos',
                icon: 'error'
            }).then(() => {
                window.location=("/adminMenu/show"+this.props.match.params.is);
            });
        });
    }

    modify = (event) => {
        event.preventDefault();

        const data = {
            id: this.state.id,
            email: this.state.email,
            phone: this.state.phone,
            firstName: this.state.name,
            lastName: this.state.lastName,
            password: this.state.password,
            status: "Al dia",
	        reservations: [],
	        subscriptions:[],
        }
        axios({
            url: "/api/Modify"+this.props.match.params.is,
            method: "POST",
            data: data
        })
        .then( (res) => {
            console.log(res.data.msg);
            swal.fire({
                title: 'Listo!',
                text: 'Se modifico el ' + this.state.is + ' con éxito',
                icon: 'success'
            }).then(() => {
                window.location=("/adminMenu/show"+this.props.match.params.is);
            });
        })
        .catch( () => {
            swal.fire({
                title: 'Error',
                text: 'Ocurrio un problema, vuelva a intentarlo más tarde',
                icon: 'error'
            }).then(() => {
                window.location=("/adminMenu/show"+this.props.match.params.is);
            });
        })
    }

    render () {
        return (
            <div className="window">
                <form onSubmit={this.modify}>
                    <div className="form-group">
                        <label for="email">Correo Electronico</label>
                        <input type="email" className="form-control" id="email" placeholder="nombre@ejemplo.com" name="email" value={this.state.email}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label for="name">Nombre</label>
                            <input type="text" className="form-control" id="name" placeholder="Nombre" name="name" value={this.state.name}
                            onChange={this.handleChange}/>
                        </div>
                        <div className="col">
                            <label for="lastname">Apellido</label>
                            <input type="text" className="form-control" id="lastname" placeholder="Apellido" name="lastname" value={this.state.lastname}
                            onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="id">Cédula</label>
                        <input type="text" className="form-control" id="id" placeholder="#####" name="id" value={this.state.id}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label for="phone">Número Telefono</label>
                        <input type="text" className="form-control" id="phone" placeholder="#####" name="phone" value={this.state.phone}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label for="password">Contraseña</label>
                            <input type="password" className="form-control" id="password" name="password" value={this.state.password}
                            onChange={this.handleChange}/>
                        </div>
                        <div className="col">
                            <label for="confirm">Confirmar Contraseña</label>
                            <input type="password" className="form-control" id="confirm" name="confirm" value={this.state.confirm}
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

export default Modify;