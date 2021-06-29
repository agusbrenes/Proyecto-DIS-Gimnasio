import axios from "axios";
import React, {Component} from "react";
import Navbar from "./NavBar/NavBar";
import swal from "sweetalert2";

class Buzon extends Component {
    state = {
        isAdmin: true,
        msgs: [], 
        list: []
    }

    componentDidMount = async () => {
        var token = localStorage.getItem("token")
        
        if (token === null) {
            window.location=("/loginClient");
        }

        token = await JSON.parse(localStorage.getItem("token"));

        if(token.isAdmin === false){
            this.setState({
                isAdmin: false
            })
        }
        this.getMsj(token.id);
    }

    getMsj = (data) => {
        console.log(data);
        var url;
        if (this.state.isAdmin){
            url = "/api/GetAdmin"
        } else {
            url = "/api/GetInstructor"
        }
        axios({
            url,
            method: "POST",
            data: {id: data}
        })
        .then(async (res) => {
            const data = res.data;
            if (data[0].messages.length === 0){
                swal.fire({
                    title: 'Actualmente no tiene mensajes registrados',
                    background: "black",
                    confirmButtonText: "Regresar",
                    icon: 'warning'
                }).then(() => {
                    window.history.back();
                });
            } else {
                console.log(data[0].messages)
                data[0].messages.forEach((item) => {
                    this.state.list.push(item.msg);
                })
                this.setState({
                    msgs: this.state.list
                })
            }
        })
        .catch((res) => {
            console.log(res);
            swal.fire({
                title: 'Ocurrio un problema al cargar los datos',
                background: "black",
                confirmButtonText: "Reload",
                icon: 'error'
            }).then(() => {
                window.location.reload(false);
            });
        })
    }

    show = () => {
        if (this.state.isAdmin) {
            return (
                <div className="adminMenu">
                    <div className="col-md-12">
                        <div className="row">
                            {this.state.msgs.map((post, index) =>
                            <div key={index} className="col-md-12">
                                <div className ="card text-white bg-dark mt-4">
                                    <p className="card-header text-center text">
                                        {post.msg}
                                    </p>
                                    <div className="card-footer text-center">
                                    <button className="btn btn-danger button" onClick={() => this.modify(post.session)}>
                                        Aprobar Sesión
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
        } else {
            return(
            <div className="menuInstru">
                <div className="col-md-12">
                    <div className="row">
                        {console.log(this.state)}
                        {this.state.msgs.map((post, index) =>
                        <div key={index} className="col-md-12">
                            <div className ="card text-white bg-dark mt-4">
                                <p className="card-header text-center text">
                                    {post}
                                </p>
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

    render() {
        return (
            <div>
                <Navbar/>
                {this.show()}
            </div>
        )
    }
}

export default Buzon