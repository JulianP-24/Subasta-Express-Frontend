import React from "react";
import authenticationService from "./services/authenticationService";
import './SignUp.css';
import { Link } from "react-router-dom";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.manejadorUsername = this.manejadorUsername.bind(this);
    this.manejadorPassword = this.manejadorPassword.bind(this);
    this.manejadorName = this.manejadorName.bind(this);
    this.manejadorSurName = this.manejadorSurName.bind(this);
    this.manejadorEmail = this.manejadorEmail.bind(this);
    this.manejadorRoles = this.manejadorRoles.bind(this);

    this.state = {
      username: "",
      password: "",
      name: "",
      surname: "",
      email: "",
      roles: "",
      msg: "",
    };
  }

  manejadorUsername(evt) {
    this.setState({
      username: evt.target.value,
    });
  }

  manejadorPassword(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  manejadorName(evt) {
    this.setState({
      name: evt.target.value,
    });
  }

  manejadorSurName(evt) {
    this.setState({
      surname: evt.target.value,
    });
  }

  manejadorEmail(evt) {
    this.setState({
      email: evt.target.value,
    });
  }

  manejadorRoles(evt) {
    this.setState({
      roles: evt.target.value,
    });
  }

    handleSignUp(evt) {
        evt.preventDefault();
        this.setState({
            msg: "",
            succesful: false
        });
      
        authenticationService.signUp(
            this.state.username,
            this.state.password,
            this.state.name,
            this.state.surname,
            this.state.email,
            this.state.roles
        ).then(() => {
            //this.props.history.push("/");
            window.location = '/';
            alert("Registro Exitoso");
        },
            error => {
                this.setState({
                    succesful: false,
                    msg: error.toString()
                });
                alert("Error al registrar usuario");
            }
        )
    }
  

  render() {
    return (
      <center>
        <div className="myform form ">
          <div className="logo mb-3">
            <div className="col-md-12 text-center">
              <h1>Signup</h1>
            </div>
          </div>
          <form onSubmit={this.handleSignUp}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">First Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                aria-describedby="emailHelp"
                placeholder="Enter name"
                onChange={this.manejadorName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Last Name</label>
              <input
                type="text"
                name="surname"
                className="form-control"
                id="surname"
                aria-describedby="emailHelp"
                placeholder="Enter Surname"
                onChange={this.manejadorSurName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={this.manejadorEmail}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Password"
                onChange={this.manejadorPassword}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Username"
                onChange={this.manejadorUsername}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Roles</label>
              <select name="roles" id="roles" onChange={this.manejadorRoles}>
                <option>Seleccione Rol</option>
                <option value="Comprador">Comprador</option>
                <option value="Vendedor">Vendedor</option>
              </select>
            </div>
            <div className="col-md-12 text-center mb-3">
              <button
                type="submit"
                className=" btn btn-block mybtn btn-primary tx-tfm"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </center>
    );
  }
}

export default SignUp;