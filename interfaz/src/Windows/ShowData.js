import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";

class ShowData extends Component {
    state = {
        is: "",
        data: [],
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

    componentWillMount = () => {
        if (this.props.match.params.is === "Admin"){
            this.setState({
                is: "Administrador"
            });
            this.getData();
        } else if (this.props.match.params.is === "Instructor"){
            this.setState({
                is: "Instructor",
            });
            this.getData();
        } else if (this.props.match.params.is === "Client"){
            this.setState({
                is: "Cliente",
            });
            this.getData();
        }
    }

    getData = async () => {
        await axios({
            url: "/api/Get"+this.props.match.params.is+"s",
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
                this.state.list.push(info);
            });
            this.setState({
                data: this.state.list
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

    modify = (id) => {
        if (this.state.is === "Administrador")
            window.location=("/modifyAdmin/"+id);
        else if (this.state.is === "Cliente")
            window.location=("/modifyClient/"+id);
        else
            window.location=("/modifyInstructor/"+id);
    }

    render() {
        return (
            <div className="showData">
                <h4 >
                    Seleccione el {this.state.is} a modificar
                </h4>
                <div className="col-md-12">
                    <div className="row">
                        {this.state.data.map((post, index) =>
                        <div key = {index} className="col-md-4">
                            <div className ="card text-white bg-dark mt-4">
                                <p className="card-header text-center text">
                                    {post.name} {post.lastname}
                                </p>
                                <p className="text-center">
                                    Cédula: {post.id}
                                </p>
                                <p className="text-center">
                                    Teléfono: {post.phone}
                                </p>
                                <p className="text-center">
                                    Email: {post.email}
                                </p>
                                <div className="card-footer text-center">
                                    <button className="btn btn-danger button" onClick={() => this.modify(post.id)}>
                                        Modificar
                                    </button>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                    <div className="card-footer text-center">
                        <button className="btn btn-dark button" onClick={() => window.history.back()}>
                            Regresar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShowData;