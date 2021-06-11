import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";
import Navbar from "./NavBar/NavBar";

class Modify extends Component {
    state = {
        name: "",
        lastname: "",
        email: "",
        id: "",
        phone: "",
        password: "",
        confirm: "",
        check: false
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
        const token = localStorage.getItem("token")
        console.log(token);
        if (token === null) {
            window.location=("/loginClient");
        }
        if (this.props.match.params.is === "Admin"){
            this.setState({
                is: "Administrador"
            });
            await this.getData();
        } else if (this.props.match.params.is === "Instructor"){
            this.setState({
                is: "Instructor",
            });
            await this.getData();
        } else if (this.props.match.params.is === "Client"){
            this.setState({
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
                window.history.back();
            });
        });
    }

    change = () => {
        this.setState({
            check: document.getElementById("check").checked
        })

        if (this.state.check){
            document.getElementById("password").disabled="disabled"
            document.getElementById("confirm").disabled="disabled"
        } else {
            document.getElementById("password").disabled=""
            document.getElementById("confirm").disabled=""
        }
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
            <div>
                <Navbar/>
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
                        <input type="text" className="form-control" id="id" placeholder="#####" name="id" value={this.state.id} disabled= "disabled"
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label for="phone">Número Telefono</label>
                        <input type="text" className="form-control" id="phone" placeholder="#####" name="phone" value={this.state.phone}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="check" placeholder="#####" name="check" value={this.state.check}
                        onChange={this.change}/>
                        <label for="check">Cambiar contraseña</label>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label for="password">Contraseña</label>
                            <input type="password" className="form-control" id="password" name="password" value={this.state.password}
                            onChange={this.handleChange} disabled="disabled"/>
                        </div>
                        <div className="col">
                            <label for="confirm">Confirmar Contraseña</label>
                            <input type="password" className="form-control" id="confirm" name="confirm" value={this.state.confirm}
                            onChange={this.handleChange} disabled="disabled"/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{marginTop:"20px"}}>
                        Modificar
                    </button>
                </form>
            </div>
            </div>
        )
    }
}

export default Modify;