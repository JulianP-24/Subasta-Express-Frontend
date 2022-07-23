import React from "react";
import authenticationService from "./services/authenticationService";
import "./SignUp.css";


class SignUp extends React.Component {
  /**
   * The constructor function is a special method for creating and initializing an object created
   * within a class.
   * @param props - The props passed to the component.
   */
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

  /**
   * When the user types in the input field, the value of the input field is set to the state of the
   * username.
   * @param evt - The event object
   */
  manejadorUsername(evt) {
    this.setState({
      username: evt.target.value,
    });
  }

  /**
   * When the user types in the password field, the value of the password field is set to the state of
   * the password variable.
   * @param evt - The event object
   */
  manejadorPassword(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  /**
   * The function manejadorName takes an event as an argument and sets the state of the name property
   * to the value of the event target.
   * @param evt - The event object
   */
  manejadorName(evt) {
    this.setState({
      name: evt.target.value,
    });
  }

  /**
   * The function manejadorSurName is an event handler that takes an event as an argument and sets the
   * state of the surname property to the value of the event target.
   * @param evt - The event object
   */
  manejadorSurName(evt) {
    this.setState({
      surname: evt.target.value,
    });
  }

  /**
   * When the user types in the email input, the value of the input is set to the state of the email
   * property.
   * @param evt - The event object
   */
  manejadorEmail(evt) {
    this.setState({
      email: evt.target.value,
    });
  }

  /**
   * When the user changes the value of the select element, update the state of the component with the
   * new value.
   * @param evt - The event object
   */
  manejadorRoles(evt) {
    this.setState({
      roles: evt.target.value,
    });
  }

  /**
   * It takes the data from the form and sends it to the backend.
   * </code>
   * @param evt - The event object.
   */
  handleSignUp(evt) {
    evt.preventDefault();
    this.setState({
      msg: "",
      succesful: false,
    });

    authenticationService
      .signUp(
        this.state.username,
        this.state.password,
        this.state.name,
        this.state.surname,
        this.state.email,
        this.state.roles
      )
      .then(
        () => {
          window.location = "/";
          alert("Registro Exitoso");
        },
        (error) => {
          this.setState({
            succesful: false,
            msg: error.toString(),
          });
          alert("Error al registrar usuario");
        }
      );
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
            <br></br>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Roles</label>
              <select name="roles" id="roles" onChange={this.manejadorRoles}>
                <option>Seleccione Rol</option>
                <option value="Comprador">Comprador</option>
                <option value="Vendedor">Vendedor</option>
              </select>
            </div>
            <br></br>
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
