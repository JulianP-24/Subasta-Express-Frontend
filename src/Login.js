import React from "react";
import Logo from "./Logo.png";
import authenticationService from "./services/authenticationService";

/* The Login class is a React component that provides a UI for a user to enter a username and password,
and to submit that information to the authenticationService.login() method. */
class Login extends React.Component {
  /**
   * The constructor is a special method for creating and initializing an object created within a
   * class.
   * @param props - The props that were passed to the component.
   */
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.manejadorUsername = this.manejadorUsername.bind(this);
    this.manejadorPassword = this.manejadorPassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
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
   * It takes the username and password from the form and sends it to the backend to be authenticated.
   * If the authentication is successful, the user is redirected to the profile page. If the
   * authentication fails, an error message is displayed.
   * </code>
   * @param evt - The event object.
   */
  handleLogin(evt) {
    evt.preventDefault();
    this.setState({
      msg: "",
      loading: true,
    });

    authenticationService.login(this.state.username, this.state.password).then(
      () => {
        window.location = "/profile";
        alert("Inicio de sesion exitoso");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          msg: resMessage,
        });
        alert("Error al iniciar sesion");
      }
    );
  }

  render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <br></br>
            <img src={Logo} width="100px" alt="User Icon" />
            <br></br>
          </div>

          <form onSubmit={this.handleLogin}>
            <input
              type="text"
              className="fadeIn second"
              name="username"
              placeholder="User"
              onChange={this.manejadorUsername}
            />
            <input
              type="password"
              className="fadeIn third"
              name="password"
              placeholder="password"
              onChange={this.manejadorPassword}
            />
            <input type="submit" className="fadeIn fourth" value="Log In" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
