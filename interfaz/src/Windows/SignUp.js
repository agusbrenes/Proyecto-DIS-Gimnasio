import React, {Component} from "react";
import "../App.css";

class signUp extends Component {


    //Función que actualiza los states
    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name] : value
        });
    }

    submit = () => {
        
    }

    render() {
        return (
            <div className="SignUp">
                <form onSubmit={this.submit}>
                    <h4 className="text-center">
                        Ingrese sus credenciales
                    </h4>
                    <div className="form-group">
                        <label for="email">Correo Electronico</label>
                        <input type="email" className="form-control" id="email" placeholder="nombre@ejemplo.com"/>
                    </div>
                    <div className="form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" className="form-control" id="password"/>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{marginTop:"20px"}}>
                        Verificar
                    </button>
                </form>
            </div>
        )
    }
}

export default signUp